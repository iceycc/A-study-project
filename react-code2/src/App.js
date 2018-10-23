import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
export default class App extends React.Component {
    state = {
        user:[],
        count:0
    }

    render(){
        return(
            <div className="container">
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        评论
                    </div>
                    <div className="panel-body">
                        身体
                    </div>
                
                </div>

            </div>
        )
    }
}

