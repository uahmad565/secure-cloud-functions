const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");

async function getAccessToken() {
  const keyFile =
    "C:\\Users\\HP\\Downloads\\visioniert-423714-f6ae290acaed.json"; // replace with the path to your service account key file

  const audience =
    "https://europe-west3-visioniert-423714.cloudfunctions.net/watermark-image-function"; // Go to your Cloud function and find "Trigger" tab to get your cloud function URL
  const auth = new GoogleAuth({
    keyFile: keyFile,
  });

  const client = await auth.getIdTokenClient(audience);
  const tokenResponse = await client.getRequestHeaders();
  return tokenResponse["Authorization"].split(" ")[1];
}

async function callCloudFunction() {
  try {
    const accessToken = await getAccessToken();
    console.log(accessToken);

    // return;
    const functionUrl =
      "https://europe-west3-visioniert-423714.cloudfunctions.net/watermark-image-function?inputImageUrl=https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg&watermarkImageUrl=https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg"; // replace with your Cloud Function URL
    console.log("---------------------");
    const response = await axios({
      url: functionUrl,
      method: "POST", // or 'POST' if your function expects a POST request
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error calling Cloud Function:", error);
  }
}

callCloudFunction();
