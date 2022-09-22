import { useState,useContext } from 'react';
import { Button, Modal, Form,Row } from 'react-bootstrap';
import {FiLogIn} from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import "../App.css"

const LoginModal = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const [showLogin,setShowLogin] = useState(false)
    const [loginValues,setLoginValues] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginValues(pervValue => {
            return {...pervValue, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await login(loginValues);
        setShowLogin(prev=>!prev)
        if(result){
            console.log(result);
        }
        
        if(!result){
            navigate("/");
        }  
    }


    return (
        <>
            <Link to="#" onClick={()=>setShowLogin(prev=>!prev)}>
                <li className="SidebarRow">
                    <FiLogIn className="Icon"></FiLogIn>
                    <div className="Title">Login</div>
                </li>
            </Link>
            <Modal show={showLogin} className="special_modal">
                <Modal.Header closeButton={false}>
                    <Modal.Title>Zaloguj się</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{paddingInline: "2rem"}}>
                        <Form.Group controlId="form.Email">
                            <Row>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Email" onChange={handleInputChange} value={loginValues.email}></Form.Control>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="form.Login">
                            <Row style={{marginBottom: 5}}>
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Hasło" name="password" onChange={handleInputChange} value={loginValues.password}></Form.Control>
                            </Row>
                        </Form.Group>
                        {/* <div>
                        <Link to="/restore" style={{color: "#df9705", fontSize: 14, fontWeight: 600, marginLeft: "21%", float: 'right'}}>Zapomniałeś hasła?</Link>
                        </div> */}
                        <div>
                       

                        <Form.Group controlId="form.Submit">
                            <Row style={{marginBottom: 5,width: "50%",alignContent:"right"}}>
                                <Form.Control  type="submit" onClick={handleSubmit} value="Zaloguj"></Form.Control>
                            </Row>
                        </Form.Group>
                        </div>
                        
                        <br />
                        <div className="text-center">
                        </div>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                <Button  variant="danger" onClick={()=>setShowLogin(prev=>!prev)}>Zamknij</Button> 
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default LoginModal