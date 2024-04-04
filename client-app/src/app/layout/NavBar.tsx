import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} name='Activities' to='/activities'/>
                <Menu.Item as={NavLink} name='Errors' to='/errors'/>
                <Menu.Item as={NavLink} to='/createActivity'>
                    <Button positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}