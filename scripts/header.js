/**
 * Created by ved on 31/7/16.
 */

import React, {Component} from 'react';

export default class Header extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                               <h2>Athena Store Billing Department </h2>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}