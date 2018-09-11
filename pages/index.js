import Layout from '../components/Layout';
import Link from 'next/link';
import NavBarContainer from "../components/navbars/containers";
import SideBarContainer from "../components/sidebars/containers";

export default class Index extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout>
                    <div className="container-scroller">
                        <NavBarContainer/>
                        <SideBarContainer/>
                        {/*<div className="container-fluid page-body-wrapper">
                            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                                <ul className="nav">

                                    <li className="nav-item">
                                        <a className="nav-link" href="index.html">
                                            <span className="menu-title">Dashboard</span>
                                            <i className="mdi mdi-home menu-icon"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="collapse" href="#ui-basic"
                                           aria-expanded="false"
                                           aria-controls="ui-basic">
                                            <span className="menu-title">UI Elements</span>
                                            <i className="menu-arrow"></i>
                                            <i className="mdi mdi-crosshairs-gps menu-icon"></i>
                                        </a>
                                        <div className="collapse" id="ui-basic">
                                            <ul className="nav flex-column sub-menu">
                                                <li className="nav-item">
                                                    <a className="nav-link"
                                                       href="pages/ui-features/buttons.html">
                                                        Buttons
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link"
                                                       href="pages/ui-features/typography.html">
                                                        Typography
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="pages/icons/mdi.html">
                                                        <span className="menu-title">Icons</span>
                                                        <i className="mdi mdi-contacts menu-icon"></i>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="pages/forms/basic_elements.html">
                                                        <span className="menu-title">Forms</span>
                                                        <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="pages/charts/chartjs.html">
                                                        <span className="menu-title">Charts</span>
                                                        <i className="mdi mdi-chart-bar menu-icon"></i>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="pages/tables/basic-table.html">
                                                        <span className="menu-title">Tables</span>
                                                        <i className="mdi mdi-table-large menu-icon"></i>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link"
                                                       data-toggle="collapse"
                                                       href="#general-pages"
                                                       aria-expanded="false"
                                                       aria-controls="general-pages">
                                                        <span className="menu-title">Sample Pages</span>
                                                        <i className="menu-arrow"></i>
                                                        <i className="mdi mdi-medical-bag menu-icon"></i>
                                                    </a>
                                                    <div className="collapse" id="general-pages">
                                                        <ul className="nav flex-column sub-menu">
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   href="pages/samples/blank-page.html"> Blank Page </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   href="pages/samples/login.html"> Login </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   href="pages/samples/register.html"> Register </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   href="pages/samples/error-404.html"> 404 </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   href="pages/samples/error-500.html"> 500 </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item sidebar-actions">
                                <span className="nav-link">
                                  <div className="border-bottom">
                                    <h6 className="font-weight-normal mb-3">Projects</h6>
                                  </div>
                                  <button
                                      className="btn btn-block btn-lg btn-gradient-primary mt-4">+ Add a project</button>
                                  <div className="mt-4">
                                    <div className="border-bottom">
                                      <p className="text-secondary">Categories</p>
                                    </div>
                                    <ul className="gradient-bullet-list mt-4">
                                      <li>Free</li>
                                      <li>Pro</li>
                                    </ul>
                                  </div>
                                </span>
                                    </li>
                                </ul>
                            </nav>
                            <div className="main-panel">
                                <div className="content-wrapper">
                                    <div className="page-header">
                                        <h3 className="page-title">
                                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i className="mdi mdi-home"></i>
                                    </span>
                                            Dashboard
                                        </h3>
                                        <nav aria-label="breadcrumb">
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <span></span>Overview
                                                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 stretch-card grid-margin">
                                            <div className="card bg-gradient-danger card-img-holder text-white">
                                                <div className="card-body">
                                                    <img src="/static/images/dashboard/circle.svg"
                                                         className="card-img-absolute"
                                                         alt="circle-image"/>
                                                    <h4 className="font-weight-normal mb-3">Weekly Sales
                                                        <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                                                    </h4>
                                                    <h2 className="mb-5">$ 15,0000</h2>
                                                    <h6 className="card-text">Increased by 60%</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </Layout>
            </div>
        )
    }
};