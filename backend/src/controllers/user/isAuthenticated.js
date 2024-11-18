export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      isAuthenticated: false,
    });
  }
};
