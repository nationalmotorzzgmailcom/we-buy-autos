const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwUhx4huTs1L988X23eToKcVKEXBh5vVp_xAzvOu3u0WvvdpbH5KyVRzHNPurqucoJK/exec";

exports.handler = async function (event) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        status: "ERROR",
        message: "Method not allowed. Submit the form using POST."
      })
    };
  }

  try {
    let formData;
    try {
      formData = JSON.parse(event.body || "{}");
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "ERROR",
          message: "Invalid form data."
        })
      };
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(formData),
      redirect: "follow"
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Apps Script HTTP error", response.status, responseText);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          status: "ERROR",
          message: `Google Apps Script returned HTTP ${response.status}.`
        })
      };
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (error) {
      console.error("Apps Script non-JSON response", responseText);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          status: "ERROR",
          message: "Google Apps Script returned an invalid response."
        })
      };
    }

    return {
      statusCode: result && result.status === "ERROR" ? 500 : 200,
      headers,
      body: JSON.stringify(result || {
        status: "SUCCESS",
        message: "Lead saved."
      })
    };
  } catch (error) {
    console.error("submit-lead function error", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "ERROR",
        message: error && error.message ? error.message : String(error)
      })
    };
  }
};
