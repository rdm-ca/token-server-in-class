const express = require( 'express' );
let jwt = require( 'jsonwebtoken' );
let cors = require( 'cors' );
let config = require( './config' );

let middleware = require( './middleware' );

let app = express();
app.use( cors() );
app.use( express.json() );

const port = 5000;

function login( req, res )
{
    let { username, password } = req.body;

    let mockedUsername = "admin";
    let mockedPassword = "password";

    if( username && password )
    {
        if( username === mockedUsername && password === mockedPassword )
        {
            let token = jwt.sign( {username: username},
                config.secret,
                { expiresIn: '24h' } );

            res.json(
            {
                success: true,
                message: 'Authentication successful',
                token: token
            } );
        }
        else
        {
            res.status(403).json(
            {
                success: false,
                message: 'Incorrect username or password'
            } );
        }
    }
    else
    {
        res.status(400).json(
        {
            success: false,
            message: 'Authentication failed, please check the request'
        } );
    }
}


function index( req, res )
{
    if( req.decoded.username === "admin" )
    {
        res.json(
        {
            success: true,
            message: 'Admin\'s Index page'
        } );
    }
    else
    {
        res.json(
        {
            success: true,
            message: 'Index page'
        } );
    }
}

app.post( '/login', login );
app.get( '/secure_stuff', middleware.checkToken, index );

app.listen( port, () => console.log( `Server is listening on port ${port}` ) );

