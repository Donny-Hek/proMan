import React, { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <div class="px-5 py-2 flex-nowrap" >
                <h4 class="col">
                    Добавьте новый проект или откройте уже созданный
                </h4>
            </div>
        );
    }
}