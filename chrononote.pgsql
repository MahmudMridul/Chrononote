-- drop schema cnote cascase;
-- drop table "__EFMigrationsHistory";

select 
  "Id",
  "Username",
  "Email",
  "CreatedAt",
  "UpdatedAt",
  "IsActive"
from cnote."Users";