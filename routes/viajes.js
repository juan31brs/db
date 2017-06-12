var express = require("express");
var router = express.Router();

router.get("/", (req, res, next)=>{
    req.db.query("SELECT * FROM viaje", (err, results)=>{
        if(err){
            res.send([]);
        }else{
            res.send(results)
        }
    });
});

router.get("/:id", (req, res, next)=>{
    let id = req.params.id;
    req.db.query("SELECT * FROM viaje WHERE idviaje = "+id, (err, results)=>{
        if(err || results.length == 0){
            res.status(404).send({msg:"El viaje no existe"});
        }else{
            res.send(results[0]);
        }
    });
    
});

 router.post("/", (req, res, next)=>{
    let body = req.body;
    req.db.query("INSERT INTO viaje SET nombre = ?, fecha = ?, costo = ? ", [body.nombre, body.fecha, body.costo], (err, results)=>{
        if(err){
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    });
});

router.put("/:id", (req, res, next)=>{
    let body =  req.body;
    req.db.query("UPDATE viaje SET nombre = ?, fecha = ?, costo = ? WHERE idviaje = ?"
    ,[body.nombre, body.fecha, body.costo, req.params.id], (err, results)=>{
        if(err){
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    });
});

router.delete("/:id", (req, res, next)=>{
    req.db.query("DELETE FROM viaje WHERE idviaje = ?", [req.params.id], (err, results)=>{
        if(err){
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    });
});

 module.exports = router;   