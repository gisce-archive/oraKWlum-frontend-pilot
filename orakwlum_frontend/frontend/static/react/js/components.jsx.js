/** @jsx React.DOM */

(function(React, ReactRouter, Reflux, RuleActions, ruleListStore, global) {

    // Renders a single Rule item in the list
    // Used in OraKWlumRuleMain
    var OraKWlumRuleItem = React.createClass({
        propTypes: {
            label: React.PropTypes.string.isRequired,
            isComplete: React.PropTypes.bool.isRequired,
            id: React.PropTypes.number
        },
        mixins: [React.addons.LinkedStateMixin], // exposes this.linkState used in render
        getInitialState: function() {
            return {};
        },
        handleToggle: function(evt) {
            RuleActions.toggleItem(this.props.id);
        },
        handleEditStart: function(evt) {
            evt.preventDefault();
            // because of linkState call in render, field will get value from this.state.editValue
            this.setState({
                isEditing: true,
                editValue: this.props.label
            }, function() {
                this.refs.editInput.getDOMNode().focus();
            });
        },
        handleValueChange: function(evt) {
            var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
            // we pressed enter, if text isn't empty we blur the field which will cause a save
            if (evt.which === 13 && text) {
                this.refs.editInput.getDOMNode().blur();
            }
            // pressed escape. set editing to false before blurring so we won't save
            else if (evt.which === 27) {
                this.setState({ isEditing: false },function(){
                    this.refs.editInput.getDOMNode().blur();
                });
            }
        },
        handleBlur: function() {
            var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
            // unless we're not editing (escape was pressed) or text is empty, save!
            if (this.state.isEditing && text) {
                RuleActions.editItem(this.props.id, text);
            }
            // whatever the outcome, if we left the field we're not editing anymore
            this.setState({isEditing:false});
        },
        handleDestroy: function() {
            RuleActions.removeItem(this.props.id);
        },
        render: function() {
            var classes = React.addons.classSet({
                'completed': this.props.isComplete,
                'editing': this.state.isEditing
            });
            return (
                <li className={classes}>
                    <div className="view">
                        <input className="toggle" type="checkbox" checked={!!this.props.isComplete} onChange={this.handleToggle} />
                        <label onDoubleClick={this.handleEditStart}>{this.props.label}</label>
                        <button className="destroy" onClick={this.handleDestroy}></button>
                    </div>
                    <input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handleValueChange} onBlur={this.handleBlur} />
                </li>
            );
        }
    });

    // Renders the rule list as well as the toggle all button
    // Used in RuleApp
    var OraKWlumRuleMain = React.createClass({
        mixins: [ ReactRouter.State ],
        propTypes: {
            list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
        toggleAll: function(evt) {
            RuleActions.toggleAllItems(evt.target.checked);
        },
        render: function() {
            var filteredList;
            switch(this.getPath()){
                case '/completed':
                    filteredList = _.filter(this.props.list,function(item){ return item.isComplete; });
                    break;
                case '/active':
                    filteredList = _.filter(this.props.list,function(item){ return !item.isComplete; });
                    break;
                default:
                    filteredList = this.props.list;
            }
            var classes = React.addons.classSet({
                "hidden": this.props.list.length < 1
            });
            return (
                <section id="main" className={classes}>
                    <input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul id="rule-list">
                        { filteredList.map(function(item){
                            return <OraKWlumRuleItem label={item.label} isComplete={item.isComplete} id={item.key} key={item.key}/>;
                        })}
                    </ul>
                </section>
            );
        }
    });

    // Renders the headline and the form for creating new rules.
    // Used in RuleApp
    // Observe that the toogleall button is NOT rendered here, but in OraKWlumRuleMain (it is then moved up to the header with CSS)
    var OraKWlumRuleHeader = React.createClass({
        handleValueChange: function(evt) {
            var text = evt.target.value;
            if (evt.which === 13 && text) { // hit enter, create new item if field isn't empty
                RuleActions.addItem(text);
                evt.target.value = '';
            } else if (evt.which === 27) { // hit escape, clear without creating
                evt.target.value = '';
            }
        },
        render: function() {
            return (
                <header id="header">
                    <h1>Regles</h1>
                    <input id="new-rule" placeholder="Quina regla?" autoFocus onKeyUp={this.handleValueChange}/>
                </header>
            );
        }
    });

    // Renders the bottom item count, navigation bar and clearallcompleted button
    // Used in RuleApp
    var OraKWlumRuleFooter = React.createClass({
        propTypes: {
            list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
        render: function() {
            var nbrcompleted = _.filter(this.props.list, "isComplete").length,
                nbrtotal = this.props.list.length,
                nbrincomplete = nbrtotal-nbrcompleted,
                clearButtonClass = React.addons.classSet({hidden: nbrcompleted < 1}),
                footerClass = React.addons.classSet({hidden: !nbrtotal }),
                completedLabel = "Esborrar fets (" + nbrcompleted + ")",
                itemsLeftLabel = nbrincomplete === 1 ? " regla pendent" : " regles pendents";
            return (
                <footer id="footer" className={footerClass}>
                    <span id="rule-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
                    <ul id="filters">
                        <li>
                            <ReactRouter.Link activeClassName="selected" to="All">Totes</ReactRouter.Link>
                        </li>
                        <li>
                            <ReactRouter.Link activeClassName="selected" to="Active">Actives</ReactRouter.Link>
                        </li>
                        <li>
                            <ReactRouter.Link activeClassName="selected" to="Completed">Fetes</ReactRouter.Link>
                        </li>
                    </ul>
                    <button id="clear-completed" className={clearButtonClass} onClick={RuleActions.clearCompleted}>{completedLabel}</button>
                </footer>
            );
        }
    });

    // Renders the full application
    // RouteHandler will always be OraKWlumRuleMain, but with different 'showing' prop (all/completed/active)
    var OraKWlumRule = React.createClass({
        // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
        mixins: [Reflux.connect(ruleListStore,"list")],

        render: function() {
            return (
                <div>
                    <OraKWlumRuleHeader />
                    <ReactRouter.RouteHandler list={this.state.list} />
                    <OraKWlumRuleFooter list={this.state.list} />
                </div>
            );
        }
    });

    var routes = (
        <ReactRouter.Route handler={OraKWlumRule}>
            <ReactRouter.Route name="All" path="/" handler={OraKWlumRuleMain} />
            <ReactRouter.Route name="Completed" path="/completed" handler={OraKWlumRuleMain} />
            <ReactRouter.Route name="Active" path="/active" handler={OraKWlumRuleMain} />
        </ReactRouter.Route>
    );

    ReactRouter.run(routes, function(Handler) {
        React.render(<Handler/>, document.getElementById('orakwlumRuler'));
    });




    var Yepaaaaa = React.createClass( {
        getInitialState: function() {
            return {contador: Number(this.props.contador)};
        },

        handleClick: function() {
            this.setState( {contador: this.state.contador + 1});
        },

        resetContador: function() {
            this.setState( this.getInitialState());
        },

        render: function() {
            return  <div class="pull-right">
                        <h1>Hola <i onClick={this.handleClick} onDoubleClick={this.resetContador} >{this.props.name}</i></h1>
                        <span>{this.props.IP}@{this.props.desc}</span>
                        <br/>
                        <span>Clickat {this.state.contador} vegades</span>
                    </div>
            ;
        }
    })


    React.render(<Yepaaaaa name="nano" IP="192.168.0.2" desc="Andorra la Vella" contador="0"/>, document.getElementById('user'));


})(window.React, window.ReactRouter, window.Reflux, window.RuleActions, window.ruleListStore, window);
