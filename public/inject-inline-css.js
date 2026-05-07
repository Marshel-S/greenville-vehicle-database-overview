// inject-inline.js

let cachedRules = null;

// Selector yang terlalu global, skip agar tidak merusak cascade
const SKIP_SELECTORS = ['*', 'body', 'html'];

function shouldSkip(selector) {
  return SKIP_SELECTORS.includes(selector.trim());
}

function collectRules() {
  if (cachedRules) return cachedRules;

  const allRules = [];
  const pseudoTag = document.createElement('style');
  document.head.appendChild(pseudoTag);

  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = Array.from(sheet.cssRules || []);
    } catch (e) {
      continue;
    }

    for (const rule of rules) {
      if (!(rule instanceof CSSStyleRule)) continue;

      const selectorText = rule.selectorText;
      if (!selectorText) continue;

      // Skip selector global
      if (shouldSkip(selectorText)) continue;

      if (/::?[\w-]+/.test(selectorText)) {
        const props = Array.from(rule.style).map(prop => {
          const value = rule.style.getPropertyValue(prop);
          return `${prop}: ${value} !important`;
        }).join('; ');

        try {
          pseudoTag.sheet.insertRule(
            `${selectorText} { ${props} }`,
            pseudoTag.sheet.cssRules.length
          );
        } catch (e) {
          continue;
        }
      } else {
        allRules.push(rule);
      }
    }
  }

  cachedRules = allRules;
  return allRules;
}

function applyStylesToElement(el, rules) {
  for (const rule of rules) {
    if (!(rule instanceof CSSStyleRule)) continue;

    const selectorText = rule.selectorText;
    if (!selectorText) continue;
    if (shouldSkip(selectorText)) continue;
    if (/::?[\w-]+/.test(selectorText)) continue;

    const selectors = selectorText.split(',').map(s => s.trim()).filter(Boolean);
    for (const selector of selectors) {
      try {
        if (!el.matches(selector)) continue;

        for (let i = 0; i < rule.style.length; i++) {
          const prop = rule.style[i];
          const value = rule.style.getPropertyValue(prop);
          const priority = rule.style.getPropertyPriority(prop);

          if (el.style.getPropertyValue(prop)) continue;

          el.style.setProperty(prop, value, priority);
        }
      } catch (e) {
        continue;
      }
    }
  }
}

function applyInlineStyles() {
  const rules = collectRules();

  for (const rule of rules) {
    const selectors = rule.selectorText.split(',').map(s => s.trim()).filter(Boolean);
    for (const selector of selectors) {
      // Skip selector global
      if (shouldSkip(selector)) continue;

      let elements;
      try {
        elements = Array.from(document.querySelectorAll(selector));
      } catch (e) {
        continue;
      }

      for (const el of elements) {
        for (let i = 0; i < rule.style.length; i++) {
          const prop = rule.style[i];
          const value = rule.style.getPropertyValue(prop);
          const priority = rule.style.getPropertyPriority(prop);

          if (el.style.getPropertyValue(prop)) continue;

          el.style.setProperty(prop, value, priority);
        }
      }
    }
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;

        applyStylesToElement(node, rules);

        try {
          node.querySelectorAll('*').forEach(child => {
            applyStylesToElement(child, rules);
          });
        } catch (e) {
          continue;
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

document.addEventListener('DOMContentLoaded', applyInlineStyles);