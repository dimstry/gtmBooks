import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState} from 'react';
import "../App.css";
import Skeleton from 'react-loading-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';
import Box from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import api from "../local-api/books.json";

function Content() {
    const [datas, setDatas ] = useState([])
    const [load, setLoad ] = useState(api)

    const getData = () => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer 168|cA5HBSLv4ayCchZLZZ4lzuPYsMTJMvlNl6h067sW");
    
        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        fetch("https://laravel-books-db.herokuapp.com/api/languages/id/books?category=science-fiction-fantasy&page=1", requestOptions)
        .then(response => response.json())
        .then(result => {
            setTimeout(() => {
                setDatas(result);
                setLoad([])
            }, 1000);
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setLoad(api);
        getData();
    }, [])
    

    // fungtion loading
    const loading = () => {
        return(
            <SkeletonTheme baseColor="#c7c7c7" highlightColor="#d7d7d7" >
                {
                    load.indonesia.map((i) => {
                        return(
                            <Col xs={12} md={3} className="mt-2 my-4" key={i} >
                                <Card style={{ width: '100%' }} className="shadow-sm">
                                    <Box style={{width: '280px', height: '320px' }}>
                                        <Skeleton />
                                    </Box>      
                                    <Card.Body className='my_card'>
                                        <Card.Title><Skeleton count={1} style={{width: '100%'}}/></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"><Skeleton count={1} style={{width: '100%'}}/></Card.Subtitle>
                                        <i className='text-primary'><Skeleton count={1} style={{width: '50px'}}/></i>
                                        <i variant="primary" className='go_read'><Skeleton count={1} style={{width: '60px'}}/></i>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </SkeletonTheme>
        )
    }


    return (
        <section id='paid'>
            <Container>
                <Row className='mt-2'>
                    {datas.books ? datas.books.map((data, i) => {
                        return(
                            <Col key={i} xs={12} md={3} className="mt-2 my-4">
                                <Card style={{ width: '100%' }} className="shadow-sm">
                                    <Card.Img variant="top" src={data.image} />
                                    <Card.Body className='my_card'>
                                        <Card.Title>{data.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{data.author}</Card.Subtitle>
                                        <Card.Text>{data.slug}</Card.Text>
                                        <i className='text-primary'>{data.price}</i>
                                        <Button variant="primary" className='go_read' href={data.original_url}>Go Buy</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }) : 
                        loading()
                    }
                </Row>
            </Container>
        </section>
    );
}

export default Content;