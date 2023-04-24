
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="apple-touch-icon" sizes="76x76" href="https://tools.hsinghhira.me/Favicon/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="https://tools.hsinghhira.me/Favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="https://tools.hsinghhira.me/Favicon/favicon-16x16.png">
      <link rel="manifest" href="https://tools.hsinghhira.me/Favicon/site.webmanifest">
      <link rel="mask-icon" href="https://tools.hsinghhira.me/Favicon/safari-pinned-tab.svg" color="#5bbad5">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">

      <title>DNS Lookup</title>
      <meta name="description" content="DNS Lookup">

      <link rel="stylesheet" href="https://tools.hsinghhira.me/main.css">
      <style>input[type="file"] {
            display: none;
            }
      </style>

      <script src="https://tools.hsinghhira.me/script.js"></script>

      </head>
      <body>
      <script type="text/javascript">function html2entities(){var t=/[<>"'&]/g;for(i=0;i<arguments.length;i++)arguments[i].value=arguments[i].value.replace(t,function(t){return replacechar(t)})}function replacechar(t){return"<"==t?"&lt;":">"==t?"&gt;":'"'==t?"&quot;":"'"==t?"&#039;":"&"==t?"&amp;":void 0}function countit(t){formcontent=t.form.charcount.value,t.form.displaycount.value=formcontent.length}</script>
      
      
           
            <?php
            // ini_set('display_errors', 1); // Uncomment to display errors
            // ini_set('display_startup_errors', 1); // Uncomment to display errors
            // error_reporting(E_ALL); // Uncomment to display errors
            
            // If domain is included in URL, prefill form with domain or if form is submitted display domain in it
            if( isset($_POST['domain']) )
                {
                    $value = $_POST['domain'];
                }
                else
                {
                    $value = $_GET['domain'];
                }
            
            // Parse url to extract host
            $posted_domain = $_POST['domain'];
            $parsed_url = parse_url($posted_domain);
            
            if (array_key_exists('host', $parsed_url))
                {
                    $domain = $parsed_url['host'];
                }
            else
                {
                    $domain = $posted_domain;
                }
            
            // get records
            $dns_a = dns_get_record($domain, DNS_A);
            $dns_a_ttl = $dns_a[0]['ttl'];
            
            $dns_ns = dns_get_record($domain, DNS_NS);
            $dns_ns_ttl = $dns_ns[0]['ttl'];
            
            $dns_mx = dns_get_record($domain, DNS_MX);
            $dns_mx_ttl = $dns_mx[0]['ttl'];
            
            $dns_soa = dns_get_record($domain, DNS_SOA);
            $dns_soa_ttl = $dns_soa[0]['ttl'];
            $dns_soa_email = explode(".", $dns_soa[0]['rname']);
            $dns_soa_email = $dns_soa_email[0].'@'.$dns_soa_email[1].'.'.$dns_soa_email[2];
            $dns_soa_serial = $dns_soa[0]['serial'];
            $dns_soa_refresh = $dns_soa[0]['refresh'];
            $dns_soa_retry = $dns_soa[0]['retry'];
            $dns_soa_expire = $dns_soa[0]['expire'];
            $dns_soa_minimum_ttl = $dns_soa[0]['minimum-ttl'];
            
            $dns_txt = dns_get_record($domain, DNS_TXT);
            $dns_txt_ttl = $dns_txt[0]['ttl'];
            
            $dns_aaaa = dns_get_record($domain, DNS_AAAA);
            $dns_aaaa_ttl = $dns_aaaa[0]['ttl'];
            
            // Page URL : check if "?domain=" is in the URL to adapt http_referer content
            if( (strpos($_SERVER['HTTP_REFERER'], '?domain=') !== false) )
                {
                    $page_url_domain = $_SERVER['HTTP_REFERER'];
                }
                else
                {
                    $page_url_domain = $_SERVER['HTTP_REFERER'] . "?domain=" . $value;
                }
        ?>
        
        <div class="container">
      <div class="card" style="display: flex!important;">
      <div class="card-content">
      <div class="row justify-content-center">
            
            <form action="./dnslookup.php" method="post">
            <div class="input-group">
                  <span class="input-group-text">
                        <i class="ci-search"></i>
                  </span>
            <input class="form-control" type="search" name ="domain" id="domain" placeholder="Enter URL here" value="<?=$domain?>" required>
            <button class="btn btn-primary" name="submit" type="submit">Lookup</button>
            </div>
            </form>

      </div>
      </div>
      </div>
      </div>
        
        <?php if(isset($_POST['submit'])) { ?> <!-- IF FORM SUBMITTED -->
        
   
            
            
            <div class="container">
      <div class="card" style="display: flex!important;">
      <div class="card-content">
      <div class="row justify-content-center">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Records</th>
            <th>TTL</th>
            <th>Entries for <?=$domain?></th>
          </tr>
        </thead>
        <tbody>
                
                <!-- A RECORD -->
                <tr class="table-success">
                
                <th scope="row">A</th>
                    
                        <?php if(empty($dns_a) != null){ ?> <!-- IF NO A RECORD -->
                    
                    <td>NA</td>
                    <td>No record</td>
                    
                        <?php } else { ?> <!-- ELSE A RECORD -->
                    
                    <td><?=$dns_a_ttl?></td>
                    <td>
                        <?php foreach($dns_a as $value)
                            {
                                echo "<p>";
                                $ipapi = file_get_contents('http://ip-api.com/json/' . $value['ip'] . '?fields=4195842'); // https://ip-api.com/docs/api:json#test
                                $ipapidc = json_decode($ipapi, true);
                                $country_code_flag = $ipapidc['countryCode']; // Uppercase
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[0] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[1] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo(" " . $ipapidc['countryCode'] . " · " . $value['ip']. " · (<b>ISP</b> " . $ipapidc['isp']. " <b>ORG</b> " . $ipapidc['org']. " <b>AS</b> " . $ipapidc['asname']);
                                echo ")</p>";
                            }
                        ?>
                    </td>
                    
                    <?php } ?> <!-- ENDIF A RECORD -->
                    
                </tr>
                <!-- A RECORD -->


                <!-- AAAA RECORD -->
                <tr class="table-info">
                
                <th scope="row">AAAA</th>
                    
                        <?php if(empty($dns_aaaa) != null){ ?> <!-- IF NO AAAA RECORD -->
                    
                    <td>NA</td>
                    <td>No record</td>
                    
                        <?php } else { ?> <!-- ELSE AAAA RECORD -->
                    
                    <td><?=$dns_aaaa_ttl?></td>
                    <td>
                        <?php foreach($dns_aaaa as $value)
                            {
                                echo "<p>";
                                $ipapi = file_get_contents('http://ip-api.com/json/' . $value['ipv6'] . '?fields=4195842'); // https://ip-api.com/docs/api:json#test
                                $ipapidc = json_decode($ipapi, true);
                                $country_code_flag = $ipapidc['countryCode']; // Uppercase
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[0] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[1] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo(" " . $ipapidc['countryCode'] . " · " . $value['ipv6']. " · (<b>ISP</b> " . $ipapidc['isp']. " <b>ORG</b> " . $ipapidc['org']. " <b>AS</b> " . $ipapidc['asname']);
                                echo ")</p>";
                            }
                        ?>
                    </td>
                    
                    <?php } ?> <!-- ENDIF AAAA RECORD -->
                    
                </tr>
                <!-- AAAA RECORD -->

                <!-- NS RECORD -->
                                <tr class="table-warning">
                
                <th scope="row">NX</th>
                    
                        <?php if(empty($dns_ns) != null){ ?> <!-- IF NO NS RECORD -->
                    
                    <td>NA</td>
                    <td>No record</td>
                    
                        <?php } else { ?> <!-- ELSE NS RECORD -->
                    
                    <td><?=$dns_ns_ttl?></td>
                    <td>
                    <?php foreach($dns_ns as $value)
                            {
                                echo "<p>";
                                echo($value['target']);
                                echo " (";
                                $ipapi = file_get_contents('http://ip-api.com/json/' . gethostbyname($value['target']) . '?fields=2');
                                $ipapidc = json_decode($ipapi, true);
                                $country_code_flag = $ipapidc['countryCode']; // Uppercase
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[0] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[1] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo(" " . $ipapidc['countryCode'] . " · " . gethostbyname($value['target'])); 
                                echo ")</p>";
                            }
                        ?>
                    </td>
                    
                    <?php } ?> <!-- ENDIF NS RECORD -->
                    
                </tr>
                <!-- NS RECORD -->

                <!-- MX RECORD -->
                                <tr class="table-danger">
                
                <th scope="row">MX</th>
                    
                        <?php if(empty($dns_mx) != null){ ?> <!-- IF NO MX RECORD -->
                    
                    <td>NA</td>
                    <td>No record</td>
                    
                        <?php } else { ?> <!-- ELSE MX RECORD -->
                    
                    <td><?=$dns_mx_ttl?></td>
                    <td>
                        <?php foreach($dns_mx as $value)
                            {
                                echo "<p>";
                                echo("[" . $value['pri'] . "] " . $value['target'] . " (");
                                $ipapi = file_get_contents('http://ip-api.com/json/' . gethostbyname($value['target']) . '?fields=2');
                                $ipapidc = json_decode($ipapi, true);
                                $country_code_flag = $ipapidc['countryCode']; // Uppercase
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[0] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo mb_convert_encoding( '&#' . ( 127397 + ord( $country_code_flag[1] ) ) . ';', 'UTF-8', 'HTML-ENTITIES');
                                echo(" " . $ipapidc['countryCode'] . " · " . gethostbyname($value['target']));
                                echo ")</p>";
                            }
                        ?>
                    </td>
                    
                    <?php } ?> <!-- ENDIF MX RECORD -->
                    
                </tr>
                <!-- MX RECORD -->

                <!-- SOA RECORD -->
                <tr class="table-accent">
                
                <th scope="row">SOA</th>
                    
                        <?php if(empty($dns_soa) != null){ ?> <!-- IF NO SOA RECORD -->
                    
                    <td>NA</td>
                    <td>No record</td>
                    
                        <?php } else { ?> <!-- ELSE SOA RECORD -->
                    
                    <td><?=$dns_soa_ttl?></td>
                    <td>
                            <p>Email: <?=$dns_soa_email?></p>
                            <p>Serial: <?=$dns_soa_serial?></p>
                            <p>Refresh: <?=$dns_soa_refresh?></p>
                            <p>Retry: <?=$dns_soa_retry?></p>
                            <p>Expire: <?=$dns_soa_expire?></p>
                            <p>Minimum TTL: <?=$dns_soa_minimum_ttl?></p>
                    </td>
                    
                    <?php } ?> <!-- ENDIF SOA RECORD -->
                    
                </tr>
                <!-- SOA RECORD -->

                <!-- TXT RECORD -->
                <tr class="table-active">
                
                <th scope="row">TXT</th>
                    
                        <?php if(empty($dns_txt) != null){ ?> <!-- IF NO TXT RECORD -->
                    
                    <td>NA</td>
                    <td>No record</td>
                    
                        <?php } else { ?> <!-- ELSE TXT RECORD -->
                    
                    <td><?=$dns_txt_ttl?></td>
                    <td>
                    <?php foreach($dns_txt as $value)
                            {
                                echo "<p>";
                                $dns_txt_value = wordwrap($value['txt'], 80, "<br/>\n", true);
                                echo $dns_txt_value;
                                echo "</p>";
                            }
                        ?>
                    </td>
                    
                    <?php } ?> <!-- ENDIF TXT RECORD -->
                    
                </tr>
                <!-- TXT RECORD -->
                
                
                </tbody>
      </table>
    </div>
    </div>
      </div>
      </div>
      </div>
      

        <?php } ?> <!-- ENDIF FORM SUBMITTED -->

      
      <center>
      Made with ❤️️ by <a href="https://me.hsinghhira.me/" target="_blank">Harman Singh Hira</a> in 🇳🇿
      </center>
      <script type="text/javascript" src="https://tools.hsinghhira.me/main.js"></script>
      <script type="text/javascript" src="https://tools.hsinghhira.me/script.js"></script>
      <script type="text/javascript" src="https://tools.hsinghhira.me/min.js"></script>
      </body></html>
