
import _ from 'underscore';


const CVTemplate = () => {
	return ( `
		<h1><%= cv.info.given_name %> <%= cv.info.family_name %></h1>
		<h2>Personal Information</h2>
		<p><strong>Address:</strong> <%= cv.info.address %></p>
		<p><strong>Phone:</strong> <%= cv.info.phone %></p>
		<p><strong>Email:</strong> <%= cv.info.email %></p>
		<p><strong>Postal Code:</strong> <%= cv.info.post_code %></p>
		<p><strong>City:</strong> <%= cv.info.city_name %></p>
		<h2>Education</h2>
		<% _.each(cv.edu, function(edu) { %>
			<div class="education">
				<h3><%= edu.degree %> in <%= edu.field %></h3>
				<p><strong><%= edu.school %></strong></p>
				<p><%= edu.starts %> - <%= edu.ends %></p>
			</div>
		<% }); %>
		<h2>Work Experience</h2>
		<% _.each(cv.exp, function(exp) { %>
			<div class="experience">
				<h3><%= exp.title %></h3>
				<p><strong><%= exp.company %></strong></p>
				<p><%= exp.starts %> - <%= exp.ends %></p>
				<p><%= exp.desc %></p>
			</div>
		<% }); %>
		<h2>Skills</h2>
		<% _.each(cv.skl, function(skl) { %>
			<div class="skill">
				<p><strong><%= skl.title %>:</strong> <%= skl.level %></p>
			</div>
		<% }); %>
	` );
};
const CVTemplate_5 = () => {
	return ( `
		<div class="p-6 mx-auto page max-w-2xl print:max-w-letter md:max-w-letter md:h-letter xsm:p-8 sm:p-9 md:p-16 bg-white">
      <header class="flex items-center mb-8 md:mb-11">
        <div class="initials-container mr-5 text-base leading-none text-white bg-gray-700 font-medium print:bg-black px-3" style="padding-bottom: 0.6875rem; padding-top: 0.6875rem;">
          <div class="initial text-center" style="padding-bottom: 0.1875rem;">M</div>
          <div class="text-center initial">M</div>
        </div>
        <h1 class="text-2xl font-semibold text-gray-750 pb-px">
					<%= cv.info.given_name %> <%= cv.info.family_name %>
				</h1>
      </header>
      <div class="md:col-count-2 print:col-count-2 col-gap-md md:h-letter-col print:h-letter-col col-fill-auto">
        <section class="mt-8 first:mt-0">
          <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
              ABOUT ME
            </h2>
            <section class="mb-4.5 break-inside-avoid">
              <header>
                <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                  User Interface Designer
                </h3>
                <p class="leading-normal text-md text-gray-650">
                  Since 2010
                </p>
              </header>
              <p class="mt-2.1 text-md text-gray-700 leading-normal">
                Minimal and formal résumé website template for print, mo&shy;bile, and desktop. The proportions are
                the same on the screen and paper. Built with amazing <a class="hover:bg-gray-150 rounded-lg transition ease-in duration-100" href="https://tailwindcss.com/">Tailwind CSS&nbsp;°</a>.
              </p>
            </section>
          </div>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Front-End Developer
              </h3>
              <p class="leading-normal text-md text-gray-650">
                Since 2013
              </p>
            </header>
            <p class="mt-2.1 text-md text-gray-700 leading-normal">
              “docs/index.html” is the main content file. By copying HTML: add pages, sec&shy;tions, subsection, and
              other parts.
            </p>
            <p class="mt-2.1 text-md text-gray-700 leading-normal">
              <span class="font-medium text-gray-600 print:text-black">Important:</span> Too much content on one page
              will break the page in the form of additional columns.
            </p>
          </section>
        </section>
        <section class="mt-8 first:mt-0">
          <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
              EXPERIENCE
            </h2>
            <section class="mb-4.5 break-inside-avoid">
              <header>
                <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                  WebPraktikos Inc.
                </h3>
                <p class="leading-normal text-md text-gray-650">
                  Jun 2018 – Present | Web Developer
                </p>
              </header>
              <p class="mt-2.1 text-md text-gray-700 leading-normal">
                Built doner pork chop • Served salmon, cream soft cheese, and brisket • Acted 55% pork chop
                • Filled burgdoggen &amp; frankfurter strip steak with 90% burger patties and broth
              </p>
            </section>
          </div>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Mammoth GmbH
              </h3>
              <p class="leading-normal text-md text-gray-650">
                Feb 2017 – Apr 2018 | Android Developer
              </p>
            </header>
            <ul class="">
              <li class="mt-2.1 text-md text-gray-700 leading-normal">
                <span class="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                Cooked shrimps for 2 to 3 minutes per side, or until opaque; then, transfered to a serving dish with limon
              </li>
              <li class="mt-2.1 text-md text-gray-700 leading-normal">
                <span class="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                Roasted a pig, turning frequently, until meat reached 160°F in the thickest part of the shoulder or thigh
              </li>
            </ul>
          </section>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Exquisite Systems d.o.o.
              </h3>
              <p class="leading-normal text-md text-gray-650">
                May 2015 – Dec 2016 | Software QA Specialist
              </p>
            </header>
            <ul class="">
              <li class="mt-2.1 text-md text-gray-700 leading-normal">
                <span class="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                Made stockfish, which is unsalted fish, usully cod, dried by cold air and wind on wooden racks on the foreshore
              </li>
              <li class="mt-2.1 text-md text-gray-700 leading-normal">
                <span class="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                Preserved meat without salt by removing fat, cutting it into very thin strips and drying it in the sun or by a fire.
              </li>
            </ul>
          </section>
        </section>
        <section class="mt-8 first:mt-0">
          <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
              EDUCATION
            </h2>
            <section class="mb-4.5 break-inside-avoid">
              <header>
                <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                  Graz University of Technology
                </h3>
                <p class="leading-normal text-md text-gray-650">
                  2014 – 2015 | Master's Degree in Chemistry
                </p>
              </header>
            </section>
          </div>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Vienna University of Technology
              </h3>
              <p class="leading-normal text-md text-gray-650">
                2010 – 2013 | Bachelor’s Degree in Biology
              </p>
            </header>
          </section>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Vienna University of Technology
              </h3>
              <p class="leading-normal text-md text-gray-650">
                2010 – 2013| Bachelor’s Degree in Chemistry
              </p>
            </header>
          </section>
        </section>
        <section class="mt-8 first:mt-0">
          <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
              PROJECTS
            </h2>
            <section class="mb-4.5 break-inside-avoid">
              <header>
                <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                  <a href="https://github.com/WebPraktikos/universal-resume" class="group">
                    Universal Resume
                    <span class="inline-block text-gray-550 print:text-black font-normal group-hover:text-gray-700 transition duration-100 ease-in">↗</span>
                  </a>
                </h3>
                <p class="leading-normal text-md text-gray-650">
                  Since 2019 | HTML CSS
                </p>
              </header>
              <p class="mt-2.1 text-md text-gray-700 leading-normal">
                Good design is as little design as possible. Less, but better — because it concentrates on the essential
                aspects, and the pro&shy;ducts are not burdened with non-essentials.
              </p>
            </section>
          </div>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                <a href="https://github.com/WebPraktikos/tailwindcss-rich-docs" class="group">
                  tailwindcss-rich-docs
                  <span class="inline-block text-gray-550 print:text-black font-normal group-hover:text-gray-700 transition duration-100 ease-in">↗</span>
                </a>
              </h3>
              <p class="leading-normal text-md text-gray-650">
                2017 | JavaScript
              </p>
            </header>
            <p class="mt-2.1 text-md text-gray-700 leading-normal">
              Good design is long-lasting. It avoids being fashionable and therefore never appears antiquated.<br>
              Good design is honest. It does not make a product more innovative, powerful or valuable than it really is.
            </p>
          </section>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Third One
              </h3>
              <p class="leading-normal text-md text-gray-650">
                2013 – 2014 | Vue
              </p>
            </header>
            <p class="mt-2.1 text-md text-gray-700 leading-normal">
              Good design is innovative. Technological development is always offering new opportunities for innovative
              design.
            </p>
          </section>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Fantastic Project
              </h3>
              <p class="leading-normal text-md text-gray-650">
                2012 | JavaScript
              </p>
            </header>
            <p class="mt-2.1 text-md text-gray-700 leading-normal">
              Strip steak tail capicola alcatra ground round tenderloin ar. Venison tri-tip porchetta, brisket
              tenderloin pig beef.
            </p>
          </section>
        </section>
        <section class="mt-8 first:mt-0">
          <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
              SKILLS
            </h2>
            <section class="mb-4.5 break-inside-avoid">
              <header>
                <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                  JavaScript
                </h3>
                <p class="leading-normal text-md text-gray-650">
                  Middle Level
                </p>
              </header>
              <p class="mt-2.1 text-md text-gray-700 leading-normal">
                Good parts: pure function, higher-order functions, factory functions, composition. Bad parts:
                inheritance, this, new.
              </p>
              <div class="my-3.2 last:pb-1.5">
                <ul class="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                  <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                    ES6
                  </li>
                  <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                    Vue
                  </li>
                  <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                    Functional Programming
                  </li>
                  <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                    Node
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <section class="mb-4.5 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
                Other
              </h3>
            </header>
            <div class="my-3.2 last:pb-1.5">
              <ul class="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  CSS
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Rust
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Git
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Go
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Linux Server
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  UI Design
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Photoshop
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Illustrator
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Figma
                </li>
                <li class="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                  Typography
                </li>
              </ul>
            </div>
          </section>
        </section>
        <section class="mt-8 first:mt-0">
          <div class="break-inside-avoid">
            <h2 class="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
              CONTACT
            </h2>
            <section class="mb-4.5 break-inside-avoid">
              <ul class="list-inside pr-7">
                <li class="mt-1.5 leading-normal text-gray-700 text-md">
                  <a href="//webpraktikos.com" class="group">
                    webpraktikos.com
                    <span class="inline-block text-gray-550 print:text-black font-normal group-hover:text-gray-700 transition duration-100 ease-in">↗</span>
                  </a>
                </li>
                <li class="mt-1.5 leading-normal text-gray-700 text-md">
                  <a href="//twitter.com/webpraktikos" class="group">
                    twitter.com/webpraktikos
                    <span class="inline-block text-gray-550 print:text-black font-normal group-hover:text-gray-700 transition duration-100 ease-in">↗</span>
                  </a>
                </li>
                <li class="mt-1.5 leading-normal text-gray-700 text-md">
                  1020 Wien, Austria
                </li>
                <li class="mt-1.5 leading-normal text-gray-700 text-md">
                  hi@webpraktikos.com
                </li>
                <li class="mt-1.5 leading-normal text-gray-700 text-md">
                  (+43) 0699 77 33 77 55
                </li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </div>
	` );
};
const CVTemplate_1 = `
<div class="container emp-profile">
  <form method="post">
      <div class="row">
          <div class="col-md-8 cv-header-left">
            <div class="profile-intro">
              <h2><%= cv.info.given_name %> <%= cv.info.family_name %></h2>
              <p class="intro-short"><%= cv.info.bio %></p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="profile-img">
              <img src="<%= cv.info.avater %>" alt="">
            </div>
          </div>
      </div>
      <hr class="devider">
      <div class="row">
        <div class="col-md-6">
          <div class="work-experience">
              <h3>Work experience</h3>
              <div class="timeline">
                <% _.each(cv.exp, function(exp) { %>
                  <div class="tl-container right">
                    <div class="content">
                        <h4><%= exp.occupation %>, <%= exp.enterprise %>, <%= exp.workplace %>, <%= exp.workload %></h4>
                        <p><%= exp.desc %></p>
                    </div>
                  </div>
                <% }); %>
              </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="work-experience">
            <% if( typeof( cv.edu ) !== "undefined" ) { %>
              <h3>My education</h3>
              <div class="timeline">
                <% _.each(cv.edu, function(edu) { %>
                  <div class="tl-container right">
                    <div class="content">
                        <h4><%= edu.training %>, <%= edu.institute %> <%= edu.to %></h4>
                        <p><%= edu.desc %></p>
                    </div>
                  </div>
                <% }); %>
              </div>
            <% } %>
            <% if( typeof( cv.inrts ) !== "undefined" ) { %>
              <h3>Interests</h3>
              <div class="timeline">
                <% _.each(cv.inrts, function(inrts) { %>
                  <div class="tl-container right">
                    <div class="content">
                        <h4><%= inrts.interest %></h4>
                        <p><%= inrts.desc %></p>
                    </div>
                  </div>
                <% }); %>
              </div>
            <% } %>
          </div>
        </div>
        <% if( typeof( cv.skl ) !== "undefined" ) { %>
          <div class="col-md-12">
            <div class="work-experience">
              <h3>Skills and knowledge</h3>
              <ul class="list">
                <% _.each(cv.skl, function(skl) { %>
                  <li class="content"><%= skl.title %> - <%= skl.points %> - <%= skl.level %></li>
                <% }); %>
              </ul>
            </div>
          </div>
        <% } %>
      </div>
  </form>           
</div>
`;
const CVTemplate_2 = `
<div class="container emp-profile cv-style-6">
  <div class="relative">
      <div class="row">
          <div class="col-md-5 cv-header-left">
            <div class="profile-intro">
                <div class="name-only-hero">
                    <h1><%= cv.info.given_name %> <%= cv.info.family_name %></h1>
                    <h4 class="intro-short">Systems analyst</h4>
                </div>
                <h3>Personal details</h3>
                <p><%= cv.info.bio %></p>
                <h3>Arbeitsreferenzen</h3>
                <% _.each(cv.exp, function(exp) { %>
                  <h3><%= exp.occupation %></h3>
                  <p><%= exp.enterprise %>, <%= exp.workplace %>, <%= exp.workload %></p>
                  <p><%= exp.desc %></p>
                <% }); %>
            </div>
          </div>
          <div class="col-md-7 cv-header-right">
            <h3>Contact details</h3>
            <p class="text-dark text-bold">
                Office address: <%= cv.info.address %><br/>
                Musterstadt E-Mail: <%= cv.info.email %><br/>
                Portfolio: <%= cv.info.website %><br/>
                LinkedIn: <%= cv.social.linkedin %>
            </p>
            <h3>Competencies</h3>
            <ul class="text-dark">
              <% if( typeof( cv.skl ) !== "undefined" ) { %>
                <% _.each(cv.skl, function(skl) { %>
                  <li><%= skl.title %> - <%= skl.points %> - <%= skl.level %></li>
                <% }); %>
              <% } %>
            </ul>
            <h3>Professional career</h3>
            <div class="row professional-career">
                <div class="col-5">
                    <h4>SYSTEMS ANALYST</h4>
                    <p>Deichmann & Meyer Ęuni 2018 to date</p>
                </div>
                <div class="col-7">
                    <ul class="list">
                        <li>Review of customers'</li>
                        <li>organizational systems Translating</li>
                        <li>business requirements into</li>
                        <li>functional designs</li>
                        <li>Training of employees and</li>
                        <li>users on various computer</li>
                        <li>programs</li>
                    </ul>
                </div>
            </div>
            <div class="row professional-career">
                <div class="col-5">
                    <h4>CHEF DATENANALYST</h4>
                    <p>Deichmann & Meyer Ęuni 2018 to date</p>
                </div>
                <div class="col-7">
                    <ul class="list">
                        <li>Review of customers'</li>
                        <li>organizational systems Translating</li>
                        <li>business requirements into</li>
                        <li>functional designs</li>
                        <li>Training of employees and</li>
                        <li>users on various computer</li>
                        <li>programs</li>
                    </ul>
                </div>
            </div>
            <h3>Academic career</h3>
            <div class="row academmic-career">
                <div class="col-5">
                    <h4>MODEL CITY UNIVERSITY OF APPLIED SCIENCES</h4>
                    <p>Postgraduiertenabschluss Fe b r u a r 201 8 bis Ę a nua r 2019</p>
                </div>
                <div class="col-7">
                    <ul class="list">
                        <li>Ęuni 2011 bis Ęuni 2015</li>
                    </ul>
                </div>
            </div>
            <div class="row academmic-career">
                <div class="col-5">
                    <h4>UNIVERSITY MODEL CITY</h4>
                    <p>Bachelor of Science</p>
                </div>
                <div class="col-7">
                    <p>
                        Zertifikat in Business Process<br/>
                        Engineering<br/>
                        – Extensive knowledge of optimizing<br/>
                        business systems and processes using<br/>
                        technology systems<br/>
                        Bachelor in Computer Engineering<br/>
                        – Minor Enterprise Systems<br/>
                        – Project coordinator, Computer Institute<br/>
                        Musterstadt, scholarship of the GHT<br/>
                        Foundation
                    </p>
                </div>
            </div>
          </div>
      </div>
  </div>
</div>
<style>.cv-style-6 {font-family: inherit;}.cv-style-6 .cv-header-left .profile-intro .name-only-hero {min-height: 40rem;text-align: right;padding: unset;padding-right: 20px;}.cv-style-6 .cv-header-left .profile-intro {padding-top: 20px;}.cv-style-6 .cv-header-left {align-items: start;}.cv-style-6 .cv-header-left .profile-intro .name-only-hero > h1 {font-size: 5rem;font-weight: 900;}.text-bold {font-weight: 900;}.cv-style-6 .cv-header-right h3, .cv-style-6 .cv-header-left h3 {font-size: 1.6rem;font-weight: 900;margin: 20px 0;}.cv-style-6 .cv-header-right > ul {list-style: disc;margin-top: 20px;font-weight: 600;}</style>
<style>
  /* body{background: -webkit-linear-gradient(left, #3931af, #00c6ff);}p {color: inherit;} */
  .emp-profile{padding: 3%;margin-top: 3%;margin-bottom: 3%;border-radius: 0.5rem;background: #fff;max-width: 66.40625rem;height: 85.9375rem;padding: 4rem 0;}
  .emp-profile > div > .row {padding: 0 4rem;}.profile-img {text-align: center;}
  .profile-img img {height: 230px;width: 200px;border-radius: 100px 100px 0 0;border: 1px solid #333;}
  .work-experience > h3 {font-size: 1.5rem;font-weight: 400;margin-left: -15px;}
  .cv-header-left {display: flex;align-items: center;}
</style>
<style>
@media print{@page{margin-top:0;margin-bottom:0;margin-left:0;margin-right:0}body{-webkit-print-color-adjust:exact!important;color-adjust:exact!important;color:#000!important}.page{padding:4rem!important}.initial{color:transparent!important;text-shadow:0 0 0 #fff!important}h1,h2,h3,li,p{color:#000!important}html{font-size:12.288px!important}}html{font-size:13.176471px}@media (min-width:640px){html{font-size:calc(3.81347px + 1.46297vw)}}@media (min-width:833px){html{font-size:calc(-.256px + 1.50588vw)}}@media (min-width:1079.5px){html{font-size:16px}}.initials-container{min-width:2.31rem}@media print{.print-bg-black{--bg-opacity:1;background-color:#000;background-color:rgba(0,0,0,var(--bg-opacity))}.print-bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.print-font-normal{font-weight:400}.print-h-letter-col{height:71.625rem}.print-h-letter-col-full{height:77.9375rem}.print-mt-16{margin-top:4rem}.print-max-w-letter{max-width:66.40625rem}.print-text-black{--text-opacity:1;color:#000;color:rgba(0,0,0,var(--text-opacity))}.print-border-inset{box-shadow:inset 0 0 0 1px #cbd5e0}.print-col-count-2{-moz-column-count:2;column-count:2}}
</style>`;
export default { template1: CVTemplate_1, template2: CVTemplate_2 };