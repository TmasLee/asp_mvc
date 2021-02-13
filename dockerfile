# Create intermediate image for back end code
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore

# Create intermediate image for front end code
FROM node:14.9.0 as clientBuild
WORKDIR /ClientApp
COPY ./ClientApp/ ./
RUN npm install
RUN npm run build

# Merge back end image content with front end image content and build app
FROM build as publish
COPY . ./
RUN dotnet publish -c release -o out
COPY --from=clientBuild ./ClientApp/ ./out/ClientApp/

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=publish /app/out .

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "asp_mvc.dll"]