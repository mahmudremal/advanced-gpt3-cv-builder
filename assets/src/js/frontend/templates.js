
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
const CVTemplates = {
  template1: `
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
  `,
  template2: `
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
                  LinkedIn: <% if( typeof( cv.scl ) !== "undefined" ) { %>
                    <%= cv.scl.linkedin %>
                  <% } else { %>
                    @<span class="select-all">place_your_linkedin_url_here</span>
                  <% } %>
              </p>
              <h3>Competencies</h3>
              <ul class="text-dark">
                <% if( typeof( cv.skl ) !== "undefined" ) { %>
                  <% _.each(cv.skl, function(skl) { %>
                    <li><%= skl.title %> - <%= skl.points %> - <%= skl.level %></li>
                  <% }); %>
                <% } %>
              </ul>
              <% if( typeof( cv.exp ) !== "undefined" ) { %>
                <h3>Professional career</h3>
                <% _.each(cv.exp, function(exp) { %>
                  <div class="row professional-career">
                    <div class="col-5">
                      <h4><%= exp.occupation %></h4>
                      <p><%= exp.enterprise %>, <%= exp.workplace %>, <%= exp.workload %></p>
                    </div>
                    <div class="col-7">
                      <%= exp.desc %>
                    </div>
                  </div>
                <% }); %>
              <% } %>
              <% if( typeof( cv.edu ) !== "undefined" ) { %>
                <h3>Academic career</h3>
                <% _.each(cv.edu, function(edu) { %>
                  <div class="row academmic-career">
                    <div class="col-5">
                      <h4><%= edu.training %></h4>
                      <p><%= edu.institute %> <%= edu.to %></p>
                    </div>
                    <div class="col-7">
                      <ul class="list">
                        <li><%= edu.desc %></li>
                      </ul>
                    </div>
                  </div>
                <% }); %>
              <% } %>
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
  </style>
  `,
  template3: `
  <div class="container emp-profile cv-style-4">
    <div class="relative">
        <div class="row">
            <div class="col-md-6 cv-header-left">
              <div class="profile-intro">
                  <div class="name-only-hero">
                      <h1><%= cv.info.given_name %> <%= cv.info.family_name %></h1>
                      <h4 class="intro-short"><%= cv.info.tagline %></h4>
                      <div class="profile-img">
                          <img src="<%= cv.info.avater %>" alt="" class="profile-image-top-round">
                      </div>
                      <p class="img-caption-bio"><%= cv.info.bio %></p>
                  </div>
                  
                  <div class="personaldetails">
                      <table>
                          <tbody>
                              <tr>
                                  <td>Tel:</td>
                                  <td><%= cv.info.phone %></td>
                              </tr>
                              <tr>
                                  <td>Email:</td>
                                  <td><%= cv.info.email %></td>
                              </tr>
                              <tr>
                                  <td>Address:</td>
                                  <td><%= cv.info.address %></td>
                              </tr>
                              <tr>
                                  <td>birthday:</td>
                                  <td><%= cv.info.birth %></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
            </div>
            <div class="col-md-6 cv-header-right">
              <% if( typeof( cv.edu ) !== "undefined" ) { %>
                <h2>School education</h2>
                <% _.each(cv.edu, function(edu) { %>
                <p>
                  <%= edu.from %> - <%= edu.to %></br/>
                  <%= edu.training %></br/>
                  <%= edu.institute %>
                </p>
                <p class="text-dark text-bold"><%= edu.desc %></p>
                <% }); %>
              <% } %>
              
              <% if( typeof( cv.exp ) !== "undefined" ) { %>
                <h2>Professional experience</h2>
                <% _.each(cv.exp, function(exp) { %>
                  <p><%= exp.workload %> employment as <%= exp.occupation %> at <%= exp.enterprise %>, <%= exp.workplace %> <%= exp.from %> - <%= exp.to %></p>
                  <p><%= exp.desc %></p>
                <% }); %>
              <% } %>
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
              <% if( typeof( cv.skl ) !== "undefined" ) { %>
              <h3>Abilities</h3>
              <div class="abilities">
                  <table>
                      <tbody>
                        <% _.each(cv.skl, function(skl) { %>
                          <tr>
                            <td><%= skl.title %></td>
                            <td class="progress-single">
                              <progress max="100" value="<%= ( skl.points * 16.66667 ) %>" data-value="<%= ( skl.points * 16.66667 ) %>"></progress>
                              <!-- <span class="percentage"><%= skl.level %></span> -->
                            </td>
                          </tr>
                        <% }); %>
                      </tbody>
                  </table>
                  <% } %>
              </div>
              
              <% if( typeof( cv.lng ) !== "undefined" ) { %>
              <h2>Languages</h2>
              <div class="languages">
                <table>
                  <% _.each(cv.lng, function(lng) { %>
                    <tr>
                      <td><%= lng.title %></td>
                      <td><%= lng.level %></td>
                    </tr>
                  <% }); %>
                </table>
              </div>
              <% } %>
            </div>
        </div>
    </div>
  </div>
  <style>
      .cv-style-4 {font-family: inherit;}.cv-style-4 .cv-header-left .profile-intro .name-only-hero {min-height: 40rem;text-align: center;padding: unset;}.cv-style-4 .cv-header-left .profile-intro {margin-top: 100px;}.cv-style-4 .cv-header-left {align-items: start;}.cv-style-4 .cv-header-left .profile-intro .name-only-hero > h1 {font-size: 4.5rem;font-weight: 400;line-height: 4rem;margin-bottom: 15px;}.text-bold {font-weight: 900;}.cv-style-4 .cv-header-right h3, .cv-style-4 .cv-header-left h3 {font-size: 1.6rem;font-weight: 900;margin: 20px 0;}.cv-style-4 .cv-header-right > ul {list-style: disc;margin-top: 20px;font-weight: 600;}
  
      body{background: -webkit-linear-gradient(left, #3931af, #00c6ff);}p {color: inherit;}
      .emp-profile{padding: 3%;margin-top: 3%;margin-bottom: 3%;border-radius: 0.5rem;background: #fff;max-width: 66.40625rem;height: 85.9375rem;padding: 4rem 0;}
      .emp-profile > div > .row {padding: 0 4rem;}.profile-img {text-align: center;}
      .profile-img img {height: 320px;width: 290px;border-radius: 250px 250px 0 0;margin-top: 50px;}
      .work-experience > h3 {font-size: 1.5rem;font-weight: 400;margin-left: -15px;}
      .cv-header-left {display: flex;align-items: center;}
  
      @media print{@page{margin-top:0;margin-bottom:0;margin-left:0;margin-right:0}body{-webkit-print-color-adjust:exact!important;color-adjust:exact!important;color:#000!important}.page{padding:4rem!important}.initial{color:transparent!important;text-shadow:0 0 0 #fff!important}h1,h2,h3,li,p{color:#000!important}html{font-size:12.288px!important}}html{font-size:13.176471px}@media (min-width:640px){html{font-size:calc(3.81347px + 1.46297vw)}}@media (min-width:833px){html{font-size:calc(-.256px + 1.50588vw)}}@media (min-width:1079.5px){html{font-size:16px}}.initials-container{min-width:2.31rem}@media print{.print-bg-black{--bg-opacity:1;background-color:#000;background-color:rgba(0,0,0,var(--bg-opacity))}.print-bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.print-font-normal{font-weight:400}.print-h-letter-col{height:71.625rem}.print-h-letter-col-full{height:77.9375rem}.print-mt-16{margin-top:4rem}.print-max-w-letter{max-width:66.40625rem}.print-text-black{--text-opacity:1;color:#000;color:rgba(0,0,0,var(--text-opacity))}.print-border-inset{box-shadow:inset 0 0 0 1px #cbd5e0}.print-col-count-2{-moz-column-count:2;column-count:2}}
      .cv-style-4 .cv-header-left, .cv-style-4 .cv-header-right {border: none;padding: unset;margin: unset;}
      .cv-style-4 .cv-header-left {padding-right: 20px;border-right: 10px solid #A09AFF;}.cv-style-4 .cv-header-right {padding-left: 20px;border-left: 10px solid #A09AFF;}
      .abilities table {width: 100%;}.abilities table tr td {width: 50%;}
      p.img-caption-bio {font-size: 1rem;font-family: inherit;line-height: 1.3rem;font-weight: 600;max-width: 350px;margin: auto;margin-top: 15px;}
      .personaldetails > table {width: 100%;font-family: inherit;font-weight: 600;margin: auto;margin-top: 5rem;}
      progress {margin: 0px;width: 100%;height: 15px;border:0;}
      /*     progress:before, progress:after {content: attr(data-value);} */
      progress::-webkit-progress-bar {background-color: #D9D9D9;}
      progress::-webkit-progress-bar:before, progress::-webkit-progress-bar:after { content: attr(data-value); }
      progress::-moz-progress-bar:before, progress::-moz-progress-bar:after { content: attr(data-value); }
  
      progress::-webkit-progress-value {background-color: #2F2416;}
      progress::-webkit-progress-value:before, progress::-webkit-progress-value:after { content: attr(data-value); }
      progress::-moz-progress-value:before, progress::-moz-progress-value:after { content: attr(data-value); }
      .percentage{float: left;margin-left:100px;margin-top: -20px;position: absolute;display: block;color: #FFF;}
      .languages table {width: 100%;}
      .col-md-6.cv-header-right h2 {margin-top: 30px;font-family: inherit;font-size: 2.3rem;}
  </style>
  `,
  template4: `
  <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 794.08002 1123.36" height="1123.36" width="794.08002" xml:space="preserve" version="1.1">
    <metadata>
      <rdf:RDF>
        <cc:Work rdf:about="">
          <dc:format>
            image/svg+xml
          </dc:format>
          <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        </cc:Work>
      </rdf:RDF>
    </metadata>
    <defs>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 0,6.1035e-5 H 595.56 V 842.52006 H 0 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="M 8.875e-6,0 H 595.56001 V 842.52 H 8.875e-6 Z"/>
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path style="clip-rule:evenodd" d="m 41.3,295.42 h 211.32 v 229.2 H 41.3 Z"/>
      </clipPath>
      <mask height="1" width="1" y="0" x="0" maskUnits="userSpaceOnUse" id="mask2174">
        <image xlink:href="<%= cv.info.avater %>" preserveAspectRatio="none" style="image-rendering:optimizeSpeed" height="1" width="1"/>
      </mask>
    </defs>
    <g transform="matrix(1.3333333,0,0,-1.3333333,0,1123.36)">
      <g>
        <g clip-path="url(#clipPath18)">
          <path style="fill:#f6f6f6;fill-opacity:1;fill-rule:evenodd;stroke:none" d="m 0,0.26996 h 595.5 v 842.25 H 0 Z"/>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath28)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath36)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath44)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath52)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath60)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath68)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath76)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath84)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath92)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath100)">
          <text style="font-variant:normal;font-weight:normal;font-size:47.52000046px;font-family:TimesNewRomanPSMT;-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#2f2416;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.84906,0,0,-1,68.424,620.26)"><tspan y="0" x="0"><%= cv.info.given_name %> </tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath112)">
          <text style="font-variant:normal;font-weight:normal;font-size:47.52000046px;font-family:TimesNewRomanPSMT;-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#2f2416;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.84906,0,0,-1,29.04,582.67)"><tspan y="0" x="0"><%= cv.info.family_name %></tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath124)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath132)">
          <text style="font-variant:normal;font-weight:normal;font-size:30.95999908px;font-family:TimesNewRomanPSMT;-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,330.67,728.62)"><tspan y="0" x="0">School education</tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath144)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath152)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,330.67,709.78)">
            <tspan y="0" x="0">Abitur 2013 -2017 </tspan>
            <tspan dy="1.2em" x="0">Performance subject </tspan>
            <tspan dy="1.2em" x="0">example model school</tspan>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath232)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath240)">
          <text style="font-variant:normal;font-weight:900;font-size:9.96000004px;font-family:Arial;-inkscape-font-specification:Arial-Black;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,330.67,654.1)">
            <tspan y="0" x="0">Ausbildung 2017 - 2020 </tspan>
            <tspan dy="1.6em" x="0">School-based training as a </tspan>
            <tspan dy="1.6em" x="0">media designer digital and print</tspan>
            <tspan dy="1.6em" x="0">Specialization in Design and Technology</tspan>
            <tspan dy="1.6em" x="0">Model School</tspan>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath432)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath440)">
          <text style="font-variant:normal;font-weight:normal;font-size:11.03999996px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;letter-spacing: 5px;" transform="matrix(0.78049,0,0,-1,72.384,563.35)"><%= svg.wrapText( cv.info.tagline, 25 ) %></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath652)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath660)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath668)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath676)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath684)">
          <text style="font-variant:normal;font-weight:normal;font-size:10.22891998px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-0.97370983,46.08,273.29)">
            <%= svg.wrapText( cv.info.bio, 45 ) %>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath816)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath824)">
          <text style="font-variant:normal;font-weight:normal;font-size:30.95999908px;font-family:TimesNewRomanPSMT;-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,330.67,524.47)">
            <tspan y="0" x="0">Professional </tspan>
            <tspan dy="1em" x="0">experience</tspan>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath872)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.89189,0,0,-1,336.91,469.27)">
            <% _.each(cv.exp, function(exp) { %>
              <%= svg.wrapText( exp.occupation + ' ' + exp.enterprise + ' ' + exp.workplace + ' ' + exp.workload, 30, false, false, '1.4em' ) %>
              <%= svg.wrapText( exp.desc, 30, false, false, '1.4em', '1.4em' ) %>
            <% }); %>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1532)">
          <text style="font-variant:normal;font-weight:normal;font-size:30.95999908px;font-family:TimesNewRomanPSMT;-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,330.67,275.21)"><tspan y="0" x="0">Abilities</tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1544)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1552)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;letter-spacing: 0.1em;" transform="matrix(0.89189,0,0,-1,330.67,250.73)">
            <% _.each(cv.skl, function(skl) { %>
              <%= svg.wrapText( skl.title, 20, '<tspan x="0" dy="{{dy}}">', '</tspan>', '1.4em', '1.4em' ) %>
            <% }); %>
          </text>
        </g>
      </g>
      
      <g>
        <g clip-path="url(#clipPath1640)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1648)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.94595,0,0,-1,41.28,165.98)"><tspan y="0" x="0">Tel:</tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1660)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1668)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.78378,0,0,-1,41.28,152.06)"><tspan y="0" x="0">Email:</tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1692)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1700)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1708)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,41.28,126.38)"><tspan y="0" x="0">Address:</tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1720)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1728)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.83784,0,0,-1,121.34,165.5)"><tspan y="0" x="0"><%= cv.info.phone %></tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1784)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1792)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,121.34,151.7)"><tspan y="0" x="0"><%= cv.info.email %></tspan></text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1804)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1812)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1820)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.94595,0,0,-1,121.34,126.14)">
            <%= svg.wrapText( cv.info.address, 30 ) %>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1912)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1920)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1928)">
          <text style="font-variant:normal;font-weight:normal;font-size:30.95999908px;font-family:TimesNewRomanPSMT;-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-1,330.55,117.5)">
            <tspan y="0" x="0">Languages</tspan>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1940)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1948)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1956)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.89189,0,0,-1,41.28,87.984)">
            <tspan y="0" x="0">birthday:</tspan>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath1968)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1976)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1984)"/>
      </g>
      <g>
        <g clip-path="url(#clipPath1992)">
          <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.89189,0,0,-1,124.7,87.624)">
            <tspan y="0" x="0"><%= cv.info.birth %></tspan>
            <!-- svg.getDate( cv.info.birth, 'YYYY-MM-DD', 'MMMM DD, YYYY' ) -->
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath2044)"/>
      </g>
        <g>
          <g clip-path="url(#clipPath2052)">
            <text style="font-variant:normal;font-weight:normal;font-size:9.96000004px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(0.89189,0,0,-1,330.55,101.06)">
              <% _.each(cv.lng, function(lng) { %>
                <%= svg.wrapText( lng.title, 20, '<tspan x="0" dy="{{dy}}">', '</tspan>', '2.6em', '2.6em' ) %>
              <% }); %>
            </text>
          </g>
        </g>
      <g>
        <g clip-path="url(#clipPath2076)"/>
      </g>
      <g>
        <g>
          <text style="font-variant:normal;font-weight:normal;font-size:10.76775646px;font-family:Tahoma;-inkscape-font-specification:Tahoma;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1,0,0,-0.92498381,426.46,100.1)">
            <% _.each(cv.lng, function(lng) { %>
              <%= svg.wrapText( lng.level, 20, '<tspan x="0" dy="{{dy}}">', '</tspan>', '2.6em', '2.6em' ) %>
            <% }); %>
          </text>
        </g>
      </g>
      <g>
        <g clip-path="url(#clipPath2136)"/>
      </g>
      <path style="fill:#a09aff;fill-opacity:1;fill-rule:evenodd;stroke:none" d="m 290.4,89.62 h 15 v 752.9 h -15 z"/>
      <% _.each(cv.lng, function(lng, lngi) { %>
        <path style="fill:#d9d9d9;fill-opacity:1;fill-rule:evenodd;stroke:none" d="m 504.35,<%= ( 225.52 - ( lngi * 20 ) ) %> h 34.55 v 9.05 h -34.55 z"></path>
        <path style="fill:#2f2416;fill-opacity:1;fill-rule:evenodd;stroke:none" d="m 426.3,<%= ( 225.52 - ( lngi * 20 ) ) %> h 78.1 v 9.05 h -78.1 z"></path>
      <% }); %>
      
      <g>
        <g clip-path="url(#clipPath2170)">
          <g transform="matrix(211.32,0,0,229.2,41.3,295.42)">
            <image mask="url(#mask2174)" xlink:href="<%= cv.info.avater %>" transform="matrix(1,0,0,-1,0,1)" preserveAspectRatio="none" height="1" width="1"/>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `
};
export default CVTemplates;