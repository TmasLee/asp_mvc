using System;
using System.Threading.Tasks;
using Amazon;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Newtonsoft.Json;

namespace asp_mvc.DAL.Managers
{
    public class SecretsManager
    {
        public string GetSecret(string secretName)
        {
            string region = "us-east-1";

            // To call AWS API locally + command to run docker image locally with port forward
            // docker run -it --rm -p 5000:443 --name asp_mvc 884207845078.dkr.ecr.us-east-1.amazonaws.com/astronautsloth
            // IAmazonSecretsManager client = new AmazonSecretsManagerClient(
            //     clientAccessKey,
            //     clientAccessKeySecret,
            //     RegionEndpoint.GetBySystemName(region));

            IAmazonSecretsManager client = new AmazonSecretsManagerClient(RegionEndpoint.GetBySystemName(region));

            GetSecretValueRequest request = new GetSecretValueRequest();
            request.SecretId = secretName;
            request.VersionStage = "AWSCURRENT"; // VersionStage defaults to AWSCURRENT if unspecified.

            GetSecretValueResponse response = null;

            try
            {
                response = Task.Run(async () => await client.GetSecretValueAsync(request)).Result;
            }
            catch (ResourceNotFoundException)
            {
                Console.WriteLine("The requested secret " + secretName + " was not found");
            }
            catch (InvalidRequestException e)
            {
                Console.WriteLine("The request was invalid due to: " + e.Message);
            }
            catch (InvalidParameterException e)
            {
                Console.WriteLine("The request had invalid params: " + e.Message);
            }

            return response?.SecretString;
        }

        public string GetDbConnectionString()
        {
            string dbSecret = GetSecret("astronautsloth/db");
            dynamic dbSecretJson = JsonConvert.DeserializeObject(dbSecret);
            string host = dbSecretJson.host;
            string dbname = dbSecretJson.dbInstanceIdentifier;
            string username = dbSecretJson.username;
            string password = dbSecretJson.password;
            return "Data Source=" + host + ";Initial Catalog=" + dbname + ";User ID=" + username + ";Password=" + password + ";";
        }
    }
    
}