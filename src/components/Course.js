import React from 'react';
import Navbar from './coureses/Navbar';

const Course = () => {
    return (
        <div>
            
      <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <h1>Acada</h1>
          <p>Home of academic resources</p> 
        </div>
        <Navbar/>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-4">
              <h2>About Tutor</h2>
              <h5>Profile</h5>
              <div className="fakeimg">Image</div>
              <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
              <h3>Some Links</h3>
              <p>Lorem ipsum dolor sit ame.</p>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Courses</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="/">Support</a>
                </li>
              </ul>
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8">
              <h2>Heat Transfer</h2>
              <h5>Created, Dec 7, 2017</h5>
              <div className="fakeimg" style={{width: '21rem'}}>
                <img className="card-img-top" src="https://www.researchgate.net/profile/Ideen_Sadrehaghighi/publication/318562143/figure/fig35/AS:753699907440641@1556707469090/NASA-Highlights-How-all-3-Heat-Transfer-Methods-conduction-convection-and-radiation.png" alt="Heat Transfer Image " />
              </div>
              <p /><h5>Course description</h5><p />
              <p> Heat Transfer is one of the principle courses for all the university students who study in one of the branches of chemical engineering, mechanical engineering or materials engineering. This course which is placed at the beginning semesters of bachelor programs, is offered in two separate courses as heat transfer 1 &amp; 2 each credited as 3 units. Having a full grasp over the concepts of heat transfer and fully understand the mechanisms of heat transfer in different situations is a must for any students studying the fields mentioned. Heat transfer 
                is not only one of the core courses of those majors but also having a strong foundation in it will help to understand the concepts of future principle courses such as mass transfer, unit operation and others much better.
                The present course, Heat Transfer 1 (RAHHT1) is a crash course to help you get that last bit of concepts in. We have designed this course in less than 7 hours and within this time we have covered the most important topics of heat transfer 1. Moreover, we have brought you the most important formulas and widely used equations so that you will not be lost among the many formulas within your textbook. Also, there are sample examples that we have tried to use to show you how and when to use the formulas and where to use which one.
                This course will be a great help to those who want to have a compact and well organized resource to review their studies before their class or college exams.  
                We shall cover the principles and different aspects of the three heat transfer methods (Conduction, Convection, and Radiation) in chapter 1. The rest of the chapters will focus on conduction heat transfer more than the other two. We will begin with one dimensional conduction in steady state condition in chapter 2 and then move on to multidimensional conduction in chapter 3. Lastly we discuss transient heat flow or unsteady state conduction in chapter 4. Convection and radiation heat transfer methods will be exclusively covered in heat transfer 2.</p>
              <br />
              <h2>Course Material</h2>
              <h5>Uploaded, Sep 2, 2017</h5>
              <div id="list-example" className="list-group">
                <a className="list-group-item list-group-item-action" href="#list-item-1">Simplified Notes</a>
                <a className="list-group-item list-group-item-action" href="#list-item-2">Topic 2</a>
                <a className="list-group-item list-group-item-action" href="#list-item-3">Topic 3</a>
                <a className="list-group-item list-group-item-action" href="#list-item-4">Assessment Material</a>
              </div>
              <div data-spy="scroll" data-target="#list-example" data-offset={0} className="scrollspy-example">
                <h4 id="list-item-1">Simplified Notes </h4>
                <p /><h5><a href="/">Download Simplified Notes pdf</a></h5><p />
                <h4 id="list-item-2">Topic 2</h4>
                <p>...</p>
                <h4 id="list-item-3">Topic 3</h4>
                <p>...</p>
                <h4 id="list-item-4">Assessment Material</h4>
                <p /><h5><a href="/">Download Open book test solutions 2020 pdf </a></h5><p />
              </div>
              <p>Some text..</p>
              <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            </div>
          </div>
        </div>
        <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <p>Footer</p>
        </div>
        </div>
    );
}

export default Course;
