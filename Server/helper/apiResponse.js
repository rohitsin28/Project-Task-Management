
  export const badRequest = (res, msg = "Bad Request") => {
    console.warn(`Bad Request Error: ${msg}`);
    return res.status(400).json({ success: false, message: msg });
  };

export const unauthorized = (res, msg = "Unauthorized") => {
    console.warn(`Unauthorized Request Error: ${msg}`);
    return res.status(401).json({ success: false, message: msg });
  };

export const internalServerError = (res, error) => {
    console.error("Internal Server Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  };

export const success = (res, msg = "Success", data = null) => {
    console.log(`API Success: ${msg}`);
    const response = { success: true, message: msg,
      ...(data != null && { data })};
    return res.status(200).json(response);
  };
  