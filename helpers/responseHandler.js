module.exports = {
  successWithData: (res, data, msg) => {
    return res.status(200).json({
      responseCode: 200,
      status: true,
      message: msg,
      data,
    });
  },

  success: (res, msg) => {
    return res.status(200).json({
      responseCode: 200,
      status: true,
      message: msg,
    });
  },

  successFusion: (res, data) => {
    return res.status(200).json(data);
  },
};
