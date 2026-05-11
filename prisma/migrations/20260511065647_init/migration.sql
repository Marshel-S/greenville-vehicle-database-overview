BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [brand] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [user_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[vehicle] (
    [id] INT NOT NULL IDENTITY(1,1),
    [car_name] NVARCHAR(1000) NOT NULL,
    [brand] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [fuel] NVARCHAR(1000),
    [colors] NVARCHAR(1000),
    [price] INT,
    [topSpeed] INT NOT NULL,
    [image] NVARCHAR(1000),
    [authorId] INT,
    CONSTRAINT [vehicle_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[maps] (
    [place_id] INT NOT NULL IDENTITY(1,1),
    [place_name] NVARCHAR(1000) NOT NULL,
    [place_category] NVARCHAR(1000) NOT NULL,
    [place_image] NVARCHAR(1000) NOT NULL,
    [place_desc] NVARCHAR(1000),
    [location] NVARCHAR(1000) NOT NULL,
    [uses] NVARCHAR(1000),
    [location_ref] NVARCHAR(1000),
    [location_link_ref] NVARCHAR(max),
    [place_int] NVARCHAR(1000),
    [place_ext] NVARCHAR(1000),
    CONSTRAINT [maps_pkey] PRIMARY KEY CLUSTERED ([place_id])
);

-- CreateTable
CREATE TABLE [dbo].[mapsCategory] (
    [place_category_id] INT NOT NULL IDENTITY(1,1),
    [place_category] NVARCHAR(1000),
    [place_category_desc] NVARCHAR(1000),
    CONSTRAINT [mapsCategory_pkey] PRIMARY KEY CLUSTERED ([place_category_id]),
    CONSTRAINT [mapsCategory_place_category_key] UNIQUE NONCLUSTERED ([place_category])
);

-- AddForeignKey
ALTER TABLE [dbo].[vehicle] ADD CONSTRAINT [vehicle_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[user]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[maps] ADD CONSTRAINT [maps_place_category_fkey] FOREIGN KEY ([place_category]) REFERENCES [dbo].[mapsCategory]([place_category]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
