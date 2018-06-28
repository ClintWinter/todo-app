const express = require("express");
const router = express.Router();
const db = require("../models");

router.route("/")
    .get((req, res) => {
        const sql = "SELECT * FROM todos";
        db.query(sql, (err, result) => {
            if (err) res.send(err);
            res.json(result);
        });
    })
    .post((req, res) => {
        const sql = `INSERT INTO todos (name) VALUES ("?")`;
        db.query(sql, [req.body.name], (err, result) => {
            if (err) res.send(err);
            const sql2 = `SELECT * FROM todos WHERE id=${result.insertId}`;
            db.query(sql2, (err2, result2) => {
                if (err2) res.send(err);
                res.status(201).json(result2);
            });
        });
    });

router.route("/:todoId")
    .put((req, res) => {
        const sql = `UPDATE todos SET completed = ? WHERE id = ?`;
        db.query(sql, [req.body.completed, req.params.todoId], (err, result) => {
            if (err) res.send(err);
            res.json({success: true});
        });
    })
    .delete((req, res) => {
        const sql = `DELETE FROM todos WHERE id=?`;
        db.query(sql, [req.params.todoId], (err, result) => {
            if (err) res.send(err);
            res.json({success: true});
        });
    });

module.exports = router;
