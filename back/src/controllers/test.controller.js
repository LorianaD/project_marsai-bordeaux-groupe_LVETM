export function testController(req, res) {

  console.log("controller test ok");
  
  
  return res.json({
    message: "controller test ok"
  })
}