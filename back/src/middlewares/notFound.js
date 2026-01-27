export default function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null
  });
}