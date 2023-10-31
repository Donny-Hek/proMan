import React, { Component } from "react";

// import UserService from "../service/user.service";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div class="px-5 py-2 flex-nowrap" >
                {/* px-5 py-3  */}
                <h4 class="col">
                    Добавьте новый проект или откройте уже созданный
                </h4>
                
            </div>
        );
    }
}