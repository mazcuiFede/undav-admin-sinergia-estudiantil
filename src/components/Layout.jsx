import React, { useState, useEffect } from "react"
import { Divider, Box } from "@mui/material"
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import "@trendmicro/react-breadcrumbs/dist/react-breadcrumbs.css"
import "@trendmicro/react-buttons/dist/react-buttons.css"
import "@trendmicro/react-dropdown/dist/react-dropdown.css"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import HomeIcon from "@mui/icons-material/Home"
import PersonIcon from "@mui/icons-material/Person"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import LogoutIcon from "@mui/icons-material/Logout"
import EventIcon from "@mui/icons-material/Event"
import QuizIcon from "@mui/icons-material/Quiz"
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Main = styled.main`
  position: relative;
  overflow: hidden;
  transition: all 0.15s;
  padding: 0 20px;
  margin-left: ${(props) => (props.expanded ? 240 : 64)}px;
`

export const Layout = ({ children }) => {
  const [selected, setSelected] = useState("principal")
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const onSelect = (selected) => {
    navigate(selected)
    setSelected(selected)
  }
  const onToggle = (expanded) => {
    setExpanded(expanded)
  }

  useEffect(() => {
    setSelected(window.location.pathname)
  }, [])

  return (
    <div>
      <SideNav
        onSelect={onSelect}
        onToggle={onToggle}
        className="sidebar sidenav"
      >
        <SideNav.Toggle />
        <SideNav.Nav selected={selected}>
          <NavItem eventKey="/principal">
            <NavIcon style={{ padding: "7px" }}>
              <HomeIcon />
            </NavIcon>
            <NavText title="Principal">Principal</NavText>
          </NavItem>

          <NavItem eventKey="/dudas">
            <NavIcon style={{ padding: "7px" }}>
              <ConnectWithoutContactIcon className="fa fa-fw fa-cogs" />
            </NavIcon>
            <NavText title="dudas">Dudas</NavText>
          </NavItem>

          <NavItem eventKey="/eventos">
            <NavIcon style={{ padding: "7px" }}>
              <EventIcon />
            </NavIcon>
            <NavText title="Eventos">Eventos</NavText>
          </NavItem>

          <NavItem eventKey="/usuarios">
            <NavIcon style={{ padding: "7px" }}>
              <PersonIcon />
            </NavIcon>
            <NavText title="admin">Usuarios</NavText>
          </NavItem>

          <Divider />

          <NavItem eventKey="/login">
            <NavIcon style={{ padding: "7px" }}>
              <LogoutIcon className="fa fa-fw fa-list-alt" />
            </NavIcon>
            <NavText title="Cerrar Sesión">Cerrar Sesión</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <Main expanded={expanded}>
        <Box mt={2}>{children}</Box>
      </Main>
    </div>
  )
}
