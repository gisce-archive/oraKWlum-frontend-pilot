import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

//Colors
import {deepOrange500, yellow500, blue500, white} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Buttons
import FlatButton from 'material-ui/FlatButton';

//Navigation
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import ListItem from 'material-ui/List/ListItem';
import FontIcon from 'material-ui/FontIcon';

//Base
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover/Popover';
import PopoverAnimationFromTop from 'material-ui/Popover/PopoverAnimationVertical';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';

//Header
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';

//Widgets
import NotificationBadge from 'material-ui/Widgets/NotificationBadge';

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
        paddingTop: 200,
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

        this.handleNotifTouch = this.handleNotifTouch.bind(this);
        this.handleNotifClose = this.handleNotifClose.bind(this);

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

    render() {
        const standardActions = (
            <FlatButton
                label="Ok"
                secondary={true}
                onTouchTap={this.handleRequestClose}
            />
        );

        const iconStyles = {
            marginRight: 24,
        };




        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div>
                        <AppBar
                            title="oKW :: Dashboard"
                            onLeftIconButtonTouchTap={this.handleDrawerToggle}
                            iconElementRight={
                                 <div>
                                    <NotificationBadge notificationsList={this.state.messages} icon={<IconMessage />} tooltip="Missatges" textColor="white" badgeColor={blue500}/>

                                    <NotificationBadge notificationsList={this.state.notifications} icon={<IconNotification />} tooltip="Notifications" textColor="white" badgeColor={deepOrange500}/>

                                    <NotificationBadge notificationsList={this.state.proposals} icon={<IconOrakwlum />} tooltip="Propostes" textColor="black" badgeColor={yellow500}/>


                                    <FlatButton label="" disabled={true} />

                                    <IconMenu
                                      iconButtonElement={<IconButton><IconSettings /></IconButton>}
                                      onChange={this.handleChangeMultiple}
                                    >
                                      <MenuItem value="1" primaryText="Perfil" />
                                      <MenuItem value="2" primaryText="Administració" />
                                      <MenuItem value="3" primaryText="Sortir" />
                                    </IconMenu>
                                </div>
                            }
                        />
                    </div>


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


                        <h1>Dashboard</h1>
                        <h2>Contingut</h2>
                        <RaisedButton
                            label="Seleccionar escenaris"
                            primary={true}
                            onTouchTap={this.handleTouchTap}
                        />

                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
