import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

//Colors
import {
    deepOrange500,
    deepOrange300,
    yellow500,
    blue500,
    white,

    orange700,
    orange400,
    amber400,
    amber200,

} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



//Buttons
import FlatButton from 'material-ui/FlatButton';

//Navigation
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

//Base
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover/Popover';
import PopoverAnimationFromTop from 'material-ui/Popover/PopoverAnimationVertical';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';

//Header
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';

//Forms
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';

//Locales
import areIntlLocalesSupported from 'intl-locales-supported';
var localesMyAppSupports = [
    "ca"
];

//Buttons
import FloatingActionButton from 'material-ui/FloatingActionButton';


//Widgets
import NotificationBadge from 'material-ui/Widgets/NotificationBadge';
import UserPanel from 'material-ui/Widgets/UserPanel';

//Icons
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import IconOrakwlum from 'material-ui/svg-icons/notification/power';
import IconChart from 'material-ui/svg-icons/editor/insert-chart';
import IconDashboard from 'material-ui/svg-icons/action/dashboard';
import IconSend from 'material-ui/svg-icons/communication/screen-share';
import IconTable from 'material-ui/svg-icons/image/grid-on';
import IconProposal from 'material-ui/svg-icons/action/perm-media';
import IconNext from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconNotification from 'material-ui/svg-icons/social/notifications';
import IconMessage from 'material-ui/svg-icons/communication/email';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconTime from 'material-ui/svg-icons/device/access-time';
import IconAdd from 'material-ui/svg-icons/content/add';

import IconUpload from 'material-ui/svg-icons/file/file-upload';
import IconDownload from 'material-ui/svg-icons/file/file-download';
import IconFile from 'material-ui/svg-icons/editor/insert-drive-file';
import IconCreate from 'material-ui/svg-icons/file/create-new-folder';
import IconFolder from 'material-ui/svg-icons/file/folder';
import IconFolderOpen from 'material-ui/svg-icons/file/folder-open';
import IconFolderShared from 'material-ui/svg-icons/file/folder-shared';

import IconNext2 from 'material-ui/svg-icons/image/navigate-next';
import IconNext3 from 'material-ui/svg-icons/navigation/chevron-right';

import IconExpand from 'material-ui/svg-icons/navigation/expand-more';
import IconCollapse from 'material-ui/svg-icons/navigation/expand-less';


const styles = {
    container: {
        textAlign: 'center',
        margin: 50,
    },

    icon: {
        marginRight: 24,
    },

    paper: {
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },

    card: {
        textAlign: 'left',
        display: 'inline-block',
        width: 800,
    },

    centered: {
        textAlign: 'center',
    },

    toggle: {
        paddingTop: 16,
        paddingBottom: 16,
    },

    boxSmall: {
        maxWidth: 350,
        marginLeft: 'auto',
        marginRight: 'auto',

        textAlign: 'left',
    },

    contentContainer: {
        width: '100%',
        maxWidth: 800,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight : 'auto',
    }

};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: orange400,
        primary2Color: orange400,
        primary3Color: amber200,
    },
});

//        accent1Color: deepOrange500,


let DateTimeFormat;

// /*

//Set the Locale
if (areIntlLocalesSupported(['ca-ES'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
      DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require('intl/locale-data/jsonp/ca-ES');
}

// */

/*
if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and patch the constructors we need with the polyfill's.
        var IntlPolyfill    = require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

*/

class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

        this.handleNotifTouch = this.handleNotifTouch.bind(this);
        this.handleNotifClose = this.handleNotifClose.bind(this);

        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        this.handleProposalCreation = this.handleProposalCreation.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        this.getSummary = this.getSummary.bind(this);

        this.getStepTitle = this.getStepTitle.bind(this);
        this.getStepSubtitle = this.getStepSubtitle.bind(this);
        this.getStepIcon = this.getStepIcon.bind(this);

        var messages = [{
            displayName: 'Equip directiu',
            displayPicture: 'dist/img/user2-160x160.jpg',
            subject: 'Necessitem les propostes de la propera setmana',
            messageTime: '5 mins',
        }, {
            displayName: 'PowERP',
            displayPicture: 'dist/img/user3-128x128.jpg',
            subject: '[ERP] Proposta 10/05/2015 validada pel responsable!',
            messageTime: '2 hours',
        }];

        var notifications = [
            {
                subject: 'Nova proposta 15-05-2015 creada',
                className: 'fa fa-users text-aqua'
            }, {
                subject: 'Càrrega d\'F1s finalitzada',
                className: 'fa fa-warning text-yellow'
            }, {
                subject: 'Nova proposta 14-05-2015 creada',
                className: 'fa fa-users text-red'
            },];

        var proposals = [{
            subject: 'Revisió de les propostes setmana 16/05',
            percentage: 85
        }, {
            subject: 'Preparació previsions setmana 23/05',
            percentage: 65
        }, {
            subject: 'Preparació previsions setmana 30/05',
            percentage: 0
        }, {
            subject: 'Comparativa proposta comprada vs real setmana 09/05',
            percentage: 10
        }];

        this.state = {
            open: false,
            drawerOpen: false,
            notificationsOpen: false,
            messagesOpen: false,
            proposalsOpen: false,

            messages: messages,
            notifications: notifications,
            proposals: proposals,

            dateStart: null,
            dateEnd: null,

            finished: false,
            stepIndex: 0,


            snack: {
                autoHideDuration: 4000,
                message: 'Event added to your calendar',
                open: false,
            },


            steps: {
                "0": {
                    title: "Rang de dates",
                    subtitle: "Esculli el rang de dates pels quals crear la nova proposta",
                    icon: <IconTime />,
                },

                "1": {
                    title: "Escenaris de càlcul",
                    subtitle: "Defineixi quins escenaris cal contemplar",
                    icon: <IconSettings />
                },

                "2": {
                    title: "Processat de la proposta",
                    subtitle: "Confirmi les dades sel·leccionades i doni-li nom a la proposta",
                    icon: <IconOrakwlum />
                },

            },
        };
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    handleDrawerToggle () {
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
    }

    handleNotifTouch (event) {
        this.setState({
            notificationsOpen: true,
            anchorEl: event.currentTarget,
        });
    }

    handleNotifClose () {
        this.setState({
            notificationsOpen: false,
        });
    }


    handleChangeDateStart (event, date) {

        var date_ = new Date(date);


        this.setState({
            dateStart: date,
        });
    }

    handleChangeDateEnd (event, date) {
        this.setState({
            dateEnd: date
        });
    }


    handleNext () {
        const {stepIndex} = this.state;

        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });

    }

    handlePrev() {
        const {stepIndex} = this.state;
        this.setState({
                stepIndex: stepIndex - 1
        });

    }

    getSummary(component) {
        var date_ =  new Date(this.state[component]);

        return ("0"+date_.getDate()).slice(-2) + "/" + ("0"+date_.getMonth()).slice(-2)  + "/" + date_.getFullYear() + " " + ("0"+date_.getHours()).slice(-2) + ":" + ("0"+date_.getMinutes()).slice(-2) ;
    }

    getStepTitle(stepIndex) {
        return this.state.steps[stepIndex].title;
    }

    getStepSubtitle(stepIndex) {
        return this.state.steps[stepIndex].subtitle;
    }

    getStepIcon(stepIndex) {
        return this.state.steps[stepIndex].icon;
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
              default:
              case 0:
                    return (
                        <div>
                            <Paper style={styles.paper} zDepth={2} rounded={false}>
                                <Toolbar>
                                    <ToolbarTitle text="Inici" />

                                    <ToolbarGroup>
                                        <DatePicker
                                            hintText="Dia"
                                            underlineShow={true}
                                            DateTimeFormat={DateTimeFormat}
                                            okLabel="OK"
                                            cancelLabel="Cancel·lar"
                                            locale="ca"
                                            autoOk={true}
                                            value={this.state.dateStart}
                                            onChange={this.handleChangeDateStart}

                                        />
                                    </ToolbarGroup>

                                    <ToolbarGroup>
                                        <TimePicker
                                            hintText="Hora"
                                            okLabel="OK"
                                            cancelLabel="Cancel·lar"
                                        />
                                    </ToolbarGroup>
                                </Toolbar>
                            </Paper>

                            <Paper style={styles.paper} zDepth={2} rounded={false}>
                                <Toolbar>
                                    <ToolbarTitle text="Final" />

                                    <DatePicker
                                        hintText="Dia"
                                        DateTimeFormat={DateTimeFormat}
                                        underlineShow={true}

                                        okLabel="OK"
                                        cancelLabel="Cancel·lar"
                                        locale="ca"
                                        autoOk={true}
                                        mode="landscape"
                                        value={this.state.dateEnd}
                                        onChange={this.handleChangeDateEnd}
                                    />

                                    <TimePicker
                                        hintText="Hora"
                                        okLabel="OK"
                                        cancelLabel="Cancel·lar"
                                    />
                                </Toolbar>
                            </Paper>
                        </div>
                );
              case 1:
                    return (
                    <div>
                        <Paper style={styles.boxSmall} zDepth={2}>

                            <List>
                                <div>
                                    <Subheader>
                                        <span>Escenaris de càlcul</span>
                                        <span style={{ textAlign: 'right' }}>
                                            <FloatingActionButton  mini={true} style={{ marginLeft: 20 }}>
                                                <IconAdd />
                                            </FloatingActionButton>
                                        </span>
                                    </Subheader>

                                </div>

                                <ListItem
                                  leftCheckbox={<Checkbox />}
                                  checked={true}
                                  primaryText="Projecció original"
                                  secondaryText=""
                                />

                                <ListItem
                                  leftCheckbox={<Checkbox />}
                                  checked={true}
                                  primaryText="Festiu CP 17300"
                                  secondaryText=""
                                />


                                <ListItem
                                  leftCheckbox={<Checkbox />}
                                  checked={true}
                                  primaryText="Baixes previstes"
                                  secondaryText=""
                                />

                                <ListItem
                                  leftCheckbox={<Checkbox />}
                                  checked={true}
                                  primaryText="Festiu Indústria"
                                  secondaryText=""
                                />

                                <ListItem
                                  leftCheckbox={<Checkbox />}
                                  checked={true}
                                  primaryText="Marge 5%"
                                  secondaryText=""
                                />

                                <ListItem
                                  leftCheckbox={<Checkbox />}
                                  checked={true}
                                  primaryText="Marge 15%"
                                  secondaryText=""
                                />


                                <ListItem
                                  leftCheckbox={<Checkbox />}
                                  checked={true}
                                  primaryText="Marge 25%"
                                  secondaryText=""
                                />
                            </List>
                        </Paper>


                    </div>




                );

              case 2:
                    return (
                        <div>
                            <div>

                                <Paper style={styles.boxSmall} zDepth={2}>
                                    <List>

                                        <ListItem >
                                            <TextField
                                              hintText="p.e 31/05/2015"
                                              floatingLabelText="Nom de la proposta"
                                              underlineShow={false}
                                            />
                                        </ListItem>


                                        <ListItem
                                            primaryText="Proposta pública"
                                            rightToggle={
                                                <Toggle/>
                                            }
                                        />

                                        <ListItem
                                            primaryText="Crear nova plantilla"
                                            rightToggle={
                                                <Toggle/>
                                            }
                                        />

                                    </List>
                                </Paper>
                            </div>

                            <br/>
                            <br/>

                            <div>

                                <Paper style={styles.boxSmall} zDepth={2}>
                                        <List>
                                            <Subheader>Rang de dates</Subheader>

                                            <ListItem
                                                    primaryText={ this.getSummary("dateStart")}
                                                    secondaryText="Data inici"
                                            />


                                            <ListItem
                                                    primaryText={ this.getSummary("dateEnd")}
                                                    secondaryText="Data fi"
                                            />

                                        </List>

                                            <Divider />

                                        <List>
                                            <Subheader>Escenaris de càlcul</Subheader>

                                            <ListItem
                                              leftCheckbox={<Checkbox />}
                                              checked={true}
                                              primaryText="Projecció original"
                                              secondaryText=""
                                            />

                                            <ListItem
                                              leftCheckbox={<Checkbox />}
                                              checked={true}
                                              primaryText="Baixes previstes"
                                              secondaryText=""
                                            />

                                            <ListItem
                                              leftCheckbox={<Checkbox />}
                                              checked={true}
                                              primaryText="Festiu CP 17300"
                                              secondaryText=""
                                            />

                                            <ListItem
                                              leftCheckbox={<Checkbox />}
                                              checked={true}
                                              primaryText="Marge 15%"
                                              secondaryText=""
                                            />
                                        </List>
                                </Paper>

                            </div>
                        </div>




            );

        }
    }

    handleRequestClose () {
        this.setState({
            snack: {
                open: false,
            }
        });
    };

    handleProposalCreation() {
        console.dir(this.state.snack);
        this.setState({
            snack: {
                open: true,
            }
        });
    };

    render() {
        const standardActions = (
            <FlatButton
                label="Ok"
                secondary={true}
                onTouchTap={this.handleRequestClose}
            />
        );

        const {finished, stepIndex} = this.state;

        const contentStyle = {margin: '0 0px'};

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div>
                        <AppBar
                            title="oKW :: Propostes"
                            onLeftIconButtonTouchTap={this.handleDrawerToggle}
                            iconElementRight={
                                <div>
                                    <NotificationBadge notificationsList={this.state.messages} icon={<IconMessage />} tooltip="Missatges" textColor="white" badgeColor={blue500}/>

                                    <NotificationBadge notificationsList={this.state.notifications} icon={<IconNotification />} tooltip="Notifications" textColor="white" badgeColor={deepOrange500}/>

                                    <NotificationBadge notificationsList={this.state.proposals} icon={<IconOrakwlum />} tooltip="Propostes" textColor="black" badgeColor={yellow500}/>

                                    <UserPanel notificationsList={this.state.proposals} icon={<IconOrakwlum />} tooltip="Propostes" textColor="black" badgeColor={yellow500}/>

                                    <IconButton/>

                                    <IconMenu
                                        iconButtonElement={<IconButton><IconSettings /></IconButton>}
                                        onChange={this.handleChangeMultiple}
                                        anchorOrigin = {{horizontal: 'left', vertical: 'bottom'}}
                                        targetOrigin = {{horizontal: 'left', vertical: 'top'}}
                                    >
                                        <MenuItem value="1" primaryText="Perfil" />
                                        <MenuItem value="2" primaryText="Administració" />
                                        <MenuItem value="3" primaryText="Sortir" />
                                    </IconMenu>
                                </div>
                            }
                        />
                    </div>

                    <Snackbar
                      open={this.state.snack.open}
                      message="Sol·licitud de creació de nova proposta enviada correctament!"
                      action=""
                      autoHideDuration={this.state.snack.autoHideDuration}
                      onRequestClose={this.handleRequestClose}
                    />

                    <Drawer
                        open={this.state.drawerOpen}
                        docked={false}
                        onRequestChange={drawerOpen => this.setState({drawerOpen})}
                    >

                        <AppBar
                            title="oraKWlum"
                            iconElementLeft={<IconButton><IconOrakwlum /></IconButton>}
                            onLeftIconButtonTouchTap={this.handleDrawerToggle}
                        />

                        <FlatButton
                            label="oraKWlum"
                            labelPosition="before"
                            primary={true}
                            disabled={true}
                            style={styles.button}
                            icon={<IconOrakwlum />}
                        />


                        <MenuItem leftIcon={<IconDashboard />} rightIcon={<IconNext />} >Dashboard</MenuItem>

                        <Divider />

                        <MenuItem leftIcon={<IconProposal />} rightIcon={<IconNext />} >Propostes</MenuItem>

                        <MenuItem leftIcon={<IconChart />} rightIcon={<IconNext />} >Gràfics</MenuItem>

                        <MenuItem leftIcon={<IconTable />} rightIcon={<IconNext />} >Taules</MenuItem>

                        <Divider />

                        <MenuItem leftIcon={<IconSend />} rightIcon={<IconNext />} >Compra</MenuItem>

                    </Drawer>





                    <div style={styles.container}>
                        <Dialog
                            open={this.state.open}
                            title="Escenaris disponibles"
                            actions={standardActions}
                            onRequestClose={this.handleRequestClose}
                        >
                            Projecció original

                        </Dialog>


                        <h1>Propostes</h1>
                        <h2>Crear nova proposta</h2>

                          <div style={styles.contentContainer}>
                            <Stepper activeStep={stepIndex}>
                              <Step>
                                <StepLabel>Sel·leccioni els dies</StepLabel>
                              </Step>

                              <Step>
                                <StepLabel>Esculli quins escenaris </StepLabel>
                              </Step>

                              <Step>
                                <StepLabel>Crei la proposta! </StepLabel>
                              </Step>
                            </Stepper>

                            <div style={contentStyle}>
                              {finished ? (
                                <p>
                                  <a
                                    href="#"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      this.setState({stepIndex: 0, finished: false});
                                    }}
                                  >
                                    Crear nova proposta
                                  </a> .
                                </p>
                              ) : (

                        <Card style={styles.card}>
                            <CardHeader
                                title={this.getStepTitle(stepIndex)}
                                subtitle={this.getStepSubtitle(stepIndex)}
                                actAsExpander={false}
                                showExpandableButton={false}
                                avatar={<Avatar icon={this.getStepIcon(stepIndex)} />}
                            />

                            <CardText
                                expandable={false}
                            />



                                <div style={styles.centered}>
                                  {this.getStepContent(stepIndex)}

                                  <div style={{marginTop: 12}}>
                                    <FlatButton
                                      label="Enrere"
                                      disabled={stepIndex === 0}
                                      onTouchTap={this.handlePrev}
                                      style={{marginRight: 12}}
                                    />
                                    <RaisedButton
                                      label={stepIndex === 2 ? 'Crear proposta' : 'Següent pas'}
                                      primary={true}
                                      onTouchTap={stepIndex === 2 ? this.handleProposalCreation : this.handleNext}
                                    />
                                  </div>
                                </div>
                            </Card>

                              )}
                            </div>
                          </div>

                        <div>

                        </div>

                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
