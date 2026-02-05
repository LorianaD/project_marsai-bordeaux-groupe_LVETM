import testModel from "../../models/test.model.js";

async function testController(req, res) {
  try {
    const dbStatus = await testModel.pingDatabase();

    res.status(200).json({
      api: "ok",
      db: dbStatus.ok === 1 ? "ok" : "error",
    });
  } catch (error) {
    res.status(500).json({
      api: "ok",
      db: "error",
      details: error.message,
    });
  }
}

export default testController;
