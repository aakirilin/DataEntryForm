# https://hub.docker.com/_/microsoft-dotnet 
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

# copy csproj and restore as distinct layers
COPY *.sln .
COPY *.csproj .
RUN dotnet restore

# copy everything else and build app
COPY ./ ./
RUN bash -E $(curl -fsSL https://deb.nodesource.com/setup_18.x | bash - ); apt install -y nodejs
WORKDIR /source
RUN ls -F
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "DataEntryForm.dll"]