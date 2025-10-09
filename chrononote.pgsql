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

select 
  "Id",
  "Token",
  "Expires",
  "Created",
  "UserId"
from cnote."RefreshTokens";

select
  "Name"
from cnote."Projects";

select 
  *
from cnote."TimeCards"
order by "ProjectId";