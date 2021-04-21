import React from 'react';
// components
import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import ViewPost from './ViewPost';
import NotFound from '../pages/NotFound';
// routes
import { BrowserRouter as Browser, Switch, Route } from 'react-router-dom';
// styles
import 'bootstrap/dist/css/bootstrap.css';

function Main(){
    return(        
        <Browser>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/new" component={NewPost} />
                    <Route exact path="/posts/edit/:id" component={EditPost} />
                    <Route exact path="/posts/:id" component={ViewPost} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Browser>        
    )
}

export default Main;