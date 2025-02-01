

<!DOCTYPE html>

<html lang="en">
<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-38074279-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-38074279-1');
</script>
    <title>
	
    Virtual Reading Room Documents Search Results

</title><link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400;1,700&amp;family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap" rel="stylesheet" />
    <script src="/scripts/jquery-3.0.0.min.js"></script>
    <script src="/scripts/bootstrap.min.js"></script>
    <script src="/scripts/FOIA.js"></script>
    <script type="text/javascript">
        $(function () {
            $(document).ready(function () {
                $("#btnSiteSearch").click(searchSite);
                $("#txtSiteSearch").keydown(onKeyDown);
                onLoad();

                    // active nav

                    // get current url
                    var location = window.location.href;
                    var test = location.replace(window.location.origin,"");
                    // remove active class from all
                    $(".navbar .nav-item").removeClass('active');
                    var href ="/";
                   if(test.toLowerCase().includes("/learn")){
                    href = "/learn";
                    } 
if(test.toLowerCase().includes("/search")){
                    href = "/search";
                    } 
                     if(test.toLowerCase().includes("/request")){
                    href = "/request";
                    }  
if(test.toLowerCase().includes("/contact")){
                    href = "/contact";
                    }                 
                    ///$(".nav-item a[href='"+location+"']").addClass('active');
               $(".nav-item a[href='"+href+"']").addClass('active');
            })

            function onKeyDown(e) {
                if (e.keyCode == 13) {
                    // Prevent form submission on enter
		            event.preventDefault();
                    searchSite();
                }
            }

            function searchSite()
            {
                var sText;

                sText = $("#txtSiteSearch").val();
                if (sText.length < 1) {
                    $("#txtSiteSearch").attr("placeholder", "text required").val("").focus().blur();
                   // $('#alertError').show();
                    return false;
                }
                location.href = "/Search/SiteResults.aspx?q=" + sText;
                return false;
            }
        })
    </script>

    <link href="/Content/bootstrap.min.css" rel="stylesheet" /><link href="/Content/Site.css" rel="stylesheet" /><link href="/Content/font-awesome.min.css" rel="stylesheet" /><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />

    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="/scripts/Results.js?buster=1.2"></script>
    <link href="../Content/Results.css" rel="stylesheet" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


    <script async type="text/javascript" id="_fed_an_ua_tag" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=DOS"></script>
</head>
<body>
    
  <nav class="navbar navbar-expand-lg navbar-dark bg-state">
 <div class="d-flex flex-row">
   <a class="navbar-brand" href="/">
    <img src="/images/logo_small_new.png" width="60" height="60" alt="Site's Icon Department of State Seal">
   </a>
      <div class="d-flex flex-column">
          <div>
              <img src="/images/title_small.png" alt="Site Title Department of State"/>

          </div>
          <div>
              <span class="FOIASubHeader">
                        Freedom of Information Act
                </span>
          </div>
      </div>
   </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
       
            <div class="d-flex flex-column ml-auto">  
                <form class="form-inline my-2 my-lg-0">                    
                    <input id="txtSiteSearch" class="form-control mr-sm-2" aria-label="Search Text input box" type="search" placeholder="Search this website">
                    <button id="btnSiteSearch" class="btn btn-primary btn-blue my-2 my-sm-0" type="button">Search</button>
                </form>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                    <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/learn">Learn</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/search">Search</a>
                    </li>
                        <li class="nav-item">
                    <a class="nav-link" href="/request">Request</a>
                    </li>
                        <li class="nav-item">
                    <a class="nav-link" href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
      
  </div>
</nav>
   
    
  
    

    <form method="post" action="./Results.aspx?searchText=%22la+paz%22&amp;beginDate=1" id="form1">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="O5ULXqZkGwgZukMxMq1RV6Ww5sDlKbYoYli3GQhaIIE1NMzYfO81roWnrW7BxXEwvrgQriAu8kYTXxQ5eegDhxtNpN7+wAHfe2B2rc0FcfI=" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="28F4F0DC" />
</div>
        <div class=" container panel bg-white rounded-top rounded-bottom">

            
    

<script src="/scripts/Navigation.js"></script>


<style type="text/css">

    .ButtonRow
    {
        border-top: 5px solid #A10F23;
        border-bottom: 5px solid #A10F23;
            
        background-color:#082243;
    }

    .ButtonRow div
    {
        color:white;
        text-transform: uppercase;
        text-align:center;
        font-weight:normal;
        font-family:'EB Garamond',Garamond, 'Times New Roman',serif;
        font-size:2em;        
        padding-top:10px;
        padding-bottom:10px;
    }

        .ButtonRow div:hover {
            /* border: thin solid yellow; */
            background-color: #104287;
            cursor: pointer;
        }


    .Divider {
        padding-right: 5px;
        padding-left: 5px;
        color: #595959;
    }

</style>
<div class="d-none d-lg-block">
    <div class="row ButtonRow rounded-top">
        <div id="HomeDiv" class="col-sm-2">
            Home
        </div>
        <div id="LearnDiv" class="col-sm-2" title="About information access programs">
            Learn
        </div>
        <div id="SearchDiv" class="col-sm-2" title="Documents and other records available online">
            Search
        </div>
        <div id="RequestDiv" class="col-sm-3" title="Documents by mail, fax, or online">
            Request
        </div>
        <div id="ContactDiv" class="col-sm-3" title="Documents by mail, fax, or online">
            Contact
        </div>
    </div>
</div>
<div id="BreadCrumbRow">
    <a href="\">Home</a>
    <span class="Divider"> » </span>
</div>
<hr />
    <h1>Virtual Reading Room Documents Search Results</h1>

    <div class="row" style="margin-bottom:3px;">
        <div class="col-sm-6">
            <div class="ResultsArea">
                <span id="lblSearchCriteria"></span>returned <span id="totalHits"></span> results.
                <div id="DocDateDiv"></div>
                <div id="PostDateDiv"></div>
            </div>
        </div>
        <div class="col-sm-6" style="text-align: right;">
            <input type="text" id="txtRefineSearch" />
            <input type="button" id="btnRefineSearch" value="Refine Search" class="btn btn-primary" />
            <span id="btnUserGuide" class="btn btn-info" title="Display User Guide">?</span>
        </div>
    </div>
    <div id="noResultsAlert" class="alert-warning" style="display:none">Your search returned zero results.</div>
    <div id="results">
    <div class="row" style="margin-bottom:3px;">
        <div class="col-sm-6">
            <span id="btnFirstTop" class="NavButton" title="Advanced to first page">&#124;&#8249;</span>
            <span id="btnPreviousTop" class="NavButton" title="Advanced to previous page">&#8249;</span>
            <span id="btnNextTop" class="NavButton" title="Advanced to next page">&#8250;</span>
            <span id="btnLastTop" class="NavButton" title="Advanced to last page">&#8250;&#124;</span>

            <b>Page:</b>
            <input type="text" id="txtPageTop" class="PageBox" />
            <b>of </b>
            <span id="lblPagesTop"></span>
            <input type="button" id="btnJumpTop" value="Jump" title="Advanced to page" class="btn btn-primary" />
        </div>
        <div class="col-sm-6" style="text-align: right;">
            <input type="button" id="btnViewTop" value="View" title="View selected" class="btn btn-primary" />
            <input type="button" id="btnPrintTop" value="Combine" title="This will combine all selected PDFs into one PDF file." class="btn btn-primary" />
            <input type="button" id="btnDownloadTop" value="Download" title="Download selected" class="btn btn-primary" />

            <span id="pnlDownload"></span>
        </div>
    </div>

    <div id="searchResultsContent" class="table-responsive-md">      
        <table border='0' id="tblResults" class="table TableResults">
            <!-- Make a Header Row -->
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" id="chkAll" title="Check all on this page." /></th>
                    <th class="SubjectColumn">Subject</th>
                    <th>Document Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Posted Date</th>
                    <th>Case Number</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <div class="row">
        <div class="col-sm-6">
            <span id="btnFirst" class="NavButton" title="Advanced to first page">&#124;&#8249;</span>
            <span id="btnPrevious" class="NavButton" title="Advanced to previous page">&#8249;</span>
            <span id="btnNext" class="NavButton" title="Advanced to next page">&#8250;</span>
            <span id="btnLast" class="NavButton" title="Advanced to last page">&#8250;&#124;</span>

            <b>Page:</b>
            <input type="text" id="txtPage" class="PageBox" />
            <b>of </b>
            <span id="lblPages"></span>
            <input type="button" id="btnJump" value="Jump" title="Advanced to page" class="btn btn-primary" />
        </div>
        <div class="col-sm-6" style="text-align: right;">
            <input type="button" id="btnViewBottom" value="View" title="View selected" class="btn btn-primary" />
            <input type="button" id="btnPrintBottom" value="Combine" title="This will combine all selected PDFs into one PDF file." class="btn btn-primary" />
            <input type="button" id="btnDownloadBottom" value="Download" title="Download selected" class="btn btn-primary" />
        </div>
    </div>
</div>
    <div class="InfoMessage">
                <p class="Header">
                    Disclaimer
                </p>

                <div style="font-size: smaller; padding-top: 15px">
                    This search is based upon locating specified words in the electronic text of documents. However, in many cases, this is dependent upon the conversion of the text in paper documents to electronic text through optical character recognition (OCR). Because of age and condition of some paper documents, the OCR may not recognize certain characters and words correctly. Please keep this in mind when using full text search, as these anomalies may affect the results of your search for relevant documents using your search criteria.<br>
                    <br>
                    <span style="font-weight: bold">Please Note</span><br>
                    <ul>
                        <li>Some of the documents in the Virtual Reading Room are those of other federal agencies.&nbsp; Any questions regarding other federal agencies’ documents should be directed to the 
                            <a href="http://www.foia.gov/report-makerequest.html" target="_blank">originating agency</a>.</li>
                        <li>The search results list sometimes displays “n/a” in the data fields, which stands for “not available”.   The data is sometimes not available depending on the document itself or how the document was processed.</li>
                    </ul>
                </div>


            </div>

    <!-- jQuery UI modal -->
    <div id="myModal" title="PDF Viewer" style="display: none;">
        <div class="PDFViewerControls">           

            <span class="Label">File: </span>
            <span class="badge">
                <span id="lblFileIndex"></span>/
                <span id="lblFileCount"></span>
            </span>

            <span id="btnDocPrevious" class="NavButton" title="Show previous document">&#8249;</span>
            <span id="btnDocNext" class="NavButton" title="Show next document">&#8250;</span>
            
            <span class="Label">Select: </span>
            <input type="checkbox" id="chkRelevant" />

            
            <!--
            <span class="Label">Name: </span>
            <span id="lblFilename"></span>
            -->
            
                       
        </div>

        <iframe id="frmPDF" src=""></iframe>    

    </div>



        </div>
        
<footer id="siteFooter" class="bg-state d-print-none">
      
   <div class="container">
      
         <ul class="nav  justify-content-center">
            <li class="nav-item"><a class="nav-link" href="/" title="Retun to Home">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/Learn/Reports.aspx" title="Link to FOIA Reports">FOIA Reports</a></li>
            <li class="nav-item"><a class="nav-link" href="/SiteMap.aspx">Site Map</a></li>
            <li class="nav-item"><a class="nav-link" href="/Disclaimers.aspx" title="Privacy and Disclaimers">Privacy &amp; Disclaimers</a></li>
            <li class="nav-item"><a class="nav-link" href="/Contact/Default.aspx">Contact</a></li>
            <li class="nav-item">
                <a class="nav-link" href="https://www.stateoig.gov/" target="_blank" title="Office of Inspector General for the Department of State and the Broadcasting Board of Governors">Inspector General (OIG) FOIA
                
                </a>
            </li>           
        </ul>
       <ul class="nav justify-content-center">
            <li class="nav-item"><a class="nav-link" href="https://www.foia.gov/" title="FOIA Website">FOIA.gov</a></li>
            <li class="nav-item"><a class="nav-link" href="https://www.state.gov/" title="State Department Website">State.gov</a></li>
            <li class="nav-item"><a class="nav-link" href="https://www.usa.gov/" title="United States of America Website">USA.gov</a></li>
            <li class="nav-item"><a class="nav-link" href="https://get.adobe.com/reader/" target="_blank">Link to download Acrobat</a></li>            
        </ul>
    </div>
  
        <span id="lblLoadCount" class="hidden"></span>
</footer>
    </form>
    
</body>
</html>
