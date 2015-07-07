var App = require("app");
var React = App.libs.React;
var _ = App.libs._;

var DevelopersService = new App.services.Developers();
var paginatorOptions = [4, 8, 12, 16, 40, 80];

var ListDevs = React.createClass({
    displayName: "ListDevs",

    mixins: [App.components.mixins.LinkedState],

    getInitialState: function () {
        "use strict";

        return {
            searchConfig: {
                q: "",
                sort: "name",
                direction: "asc",
                offset: 8,
                page: 1
            },
            devs: []
        };
    },

    componentDidMount: function () {
        "use strict";

        this.performSearch();
    },

    render: function () {
        "use strict";

        return (
            <div>

                <div className="jumbotron">
                    <div className="container text-center">
                        <h1>Escolha seu desenvolvedor!</h1>

                        <div className="col-sm-6 col-sm-offset-3">
                            <p>
                                Você tem os mais brilhantes desenvolvedores a sua disposição!
                                Escolha os que quiser e tenha certeza que seu projeto será concretizado :)
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="container devs-list">
                    <div className="devs-list-filters-container">
                        <form className="" onSubmit={ this.handleSearch }>
                            <div className="col-sm-6 col-sm-offset-3">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="glyphicon glyphicon-search" />
                                                </span>
                                                <input placeholder="Busque pelo nome ou login do desenvolvedor"
                                                       className="form-control"
                                                       value={ this.state.searchConfig.q }
                                                       onChange={ this.handleSearchConfigChange.bind(null, "q")}
                                                       id="q"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <select className="form-control"
                                                    value={ this.state.searchConfig.offset }
                                                    onChange={ this.handleSearchConfigChange.bind(null, "offset")}
                                                    id="amount"
                                            >
                                                { paginatorOptions.map(function (qtd) {
                                                    return (
                                                        <option value={ qtd }>{ qtd }</option>
                                                    );
                                                }) }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                { this.renderPaginator() }

                <div className="container devs-list-container">
                    <div className="row">
                        { this.state.devs.map(function (dev) {
                            return (
                                <div className="col-md-3 developer" key={ "dev-" + dev.id }>
                                    <div className="thumbnail">
                                        <a href={ dev.html_url }
                                           title={ "perfil de " + dev.name + " no GitHub" }
                                           target="_blank"
                                       >
                                            <img src={ dev.avatar_url } alt={ "avatar de " + dev.name } />
                                        </a>
                                    </div>
                                    <div className="caption">
                                        <h3>{ dev.name }</h3>
                                        <h4>
                                            <a href={ dev.html_url }
                                               title={ "perfil de " + dev.name + " no GitHub" }
                                               target="_blank"
                                           >
                                                @{ dev.login }
                                            </a>
                                        </h4>

                                        <p>{ dev.bio }</p>

                                        <p>
                                            <i className="glyphicon glyphicon-map-marker"></i>
                                            { dev.location || <i>indefinido</i> }
                                        </p>

                                        <div className="row devs-badges">
                                            <div className="col-sm-4">
                                                <span className="title">Seguidores</span>
                                                <span className="value">{ dev.followers }</span>
                                            </div>
                                            <div className="col-sm-4">
                                                <span className="title">Repositórios</span>
                                                <span className="value">{ dev.public_repos }</span>
                                            </div>
                                            <div className="col-sm-4">
                                                <span className="title">Preço hora</span>
                                                <span className="value">R$ { dev.price }</span>
                                            </div>
                                        </div>

                                        <div className="actions">
                                            <p className="text-center">
                                                <a className="btn btn-primary" href="#">
                                                    Adicionar ao carrinho
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) }
                    </div>
                </div>

                { this.renderPaginator() }
            </div>
        );
    },

    renderPaginator: function () {
        "use strict";

        var self = this;

        if (DevelopersService.pages === 1) {
            return "";
        }

        return (
            <div className="container center-block text-center">
                <nav>
                    <ul className="pagination">
                        <li key={ "paginator-page-prev" }>
                            <span onClick={ self.changePage.bind(null, "prev") }>&laquo;</span>
                        </li>

                        { _.map(_.range(1, DevelopersService.pages + 1), function (page) {
                            return (
                                <li onClick={ self.changePage.bind(null, page) }
                                    key={ "paginator-page-" + page }
                                    className={ page === DevelopersService.page ? "active" : "" }
                                >
                                    <span>{ page }</span>
                                </li>
                            );
                        }) }

                        <li key={ "paginator-page-next" }>
                            <span onClick={ self.changePage.bind(null, "next") }>&raquo;</span>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    },

    performSearch: function () {
        "use strict";

        DevelopersService.index(this.state.searchConfig, function (data) {
            var state = _.cloneDeep(this.state);
            state.devs = data;
            state.searchConfig.page = DevelopersService.page;

            this.setState(state);
        }.bind(this));
    },

    changePage: function (newPage) {
        "use strict";

        var state = _.cloneDeep(this.state);
        var currentPage = state.searchConfig.page;
        var changeTo = currentPage;

        if (!isNaN(newPage)) {
            changeTo = newPage;
        } else {
            switch(newPage) {
                case "prev":
                    changeTo = currentPage - 1;
                    break;
                case "next":
                    changeTo = currentPage + 1;
                    break;
                case "last":
                    changeTo = DevelopersService.pages;
                    break;
            }
        }

        if (changeTo < 1) {
            changeTo = 1;
        } else if (changeTo > DevelopersService.pages) {
            changeTo = DevelopersService.pages;
        }

        state.searchConfig.page = changeTo;
        this.setState(state, this.performSearch);
    },

    handleSearchConfigChange: function (field, event) {
        "use strict";

        var searchConfig = _.clone(this.state.searchConfig);
        searchConfig[field] = event.target.value;
        this.setState({
            searchConfig: searchConfig
        }, this.performSearch);
    },

    handleSearch: function (event) {
        "use strict";

        event.preventDefault();
        this.performSearch();
    }
});

module.exports = ListDevs;
