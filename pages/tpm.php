<?php
/**
 * This section stores student data to the database
 * !🥫 MySQL
 * !🌯 ORACLE
 * !🌮 POSTGRES
 * !🥪 SQLITE
 */
                if(isset($_POST['submit'])){
                    $name = $_POST['name'];
                    $student_id = $_POST['id'];
                    $email = $_POST['email'];
                    $age = $_POST['age'];
                    $dbtype = $_POST['dbtype'];
                    if($dbtype == "mysql"){
                        insertMySQLFunction($name, $student_id, $email, $age);
                    }
                    else if($dbtype == "oracle"){
                        insertoracleFunction($name, $student_id, $email, $age);
                    }
                    else if($dbtype == "sqlite"){
                        insertSQLFunction($name, $student_id, $email, $age);
                    }
                    else if($dbtype == "postgres"){
                        insertPostgresFunction($name, $student_id, $email, $age);
                    }
                }

                function insertMySQLFunction($name, $student_id, $email,$age) {
                  // Connecting to mysql database
                  $conn = new mysqli("localhost", "root", "awal1678", "Project2_mysql");
                  // Check for database connection error
                  if (mysqli_connect_errno()) {
                  echo( "Failed to connect to MySQL: " . mysqli_connect_error() );
                  } else {
                    echo"successfully connected!,<br/>";
                    $new_name = $conn -> real_escape_string($name);
                    $new_student_id = $conn -> real_escape_string($student_id);
                    $new_email = $conn -> real_escape_string($email);
                    $new_age = $conn -> real_escape_string($age);
                    //insert
                    $sql = "INSERT INTO users( `Name`, `Student ID`, Email, Age) VALUES( '$new_name','$new_student_id','$new_age', '$new_age');";
                    if ($conn->query($sql) === TRUE) {
                        echo "New record created successfully";
                      } else {
                        echo "Error: " . $sql . "<br>" . $conn->error;
                      }

                    mysqli_close($conn);
                  }
                }

                function insertPostgresFunction($pname, $student_id, $email, $age) {
                  // Connecting to postgresql database
                  
                  $conn = pg_connect("host=localhost dbname=Project2_postgresql user=postgres password=awal1678");
                  // Check for database connection error
                  if( $conn ) {
                   // $pdo = Connnection::get()->connect();
                   //insert
                   $sql = "INSERT INTO users(name, student, email, age) VALUES('$pname', '$student_id','$email', '$age')";
                   $result = pg_query($sql);


                  } else {
                  echo "Failed to connect to PostgreSQL:<br />";
                  }
                }

                function insertSQLFunction($pname, $student_id, $email, $age) {
                  //Connect to sqlite3
                  $conn = new SQLite3('Project2_sqlite.sqlite');
                  if( $conn ) {
                    //insert
                    
                    $statement = $conn->prepare('INSERT INTO "users" ("Name", "Student ID", "Email", "Age")
                    VALUES (:name, :uid, :email, :age)');
                    $statement->bindValue(':name', $pname);
                    $statement->bindValue(':uid', $student_id);
                    $statement->bindValue(':email', $email);
                    $statement->bindValue(':age', $age);
                    $statement->execute(); // you can reuse the statement with different values
                  } else {
                  echo "Failed to connect to SQLite:<br />";
                  }
                }

                function insertoracleFunction($pname, $student_id, $email, $age) {
                  // Connecting to oracle database
                  $conn = oci_connect('AWAL', 'awal1678', 'localhost/XE');
                  if( $conn ) {
                      //insert
                      $query = oci_parse($conn,"INSERT INTO users(Name, Student, Email, Age) VALUES( '".$pname."','".$student_id."','".$email."', '".$age."')");
                      oci_execute($query);
                      oci_close($conn);

                  } else {
                  echo "Failed to connect to Oracle:<br />";
                  }
                }
                /**
                 * This section loads data from the database
                 * !😁
                 */
                function runMySQLFunction() {
                    // Connecting to mysql database
                    $conn = new mysqli("localhost", "root", "awal1678", "Project2_mysql");
                    // Check for database connection error
                    if (mysqli_connect_errno()) {
                    echo( "Failed to connect to MySQL: " . mysqli_connect_error() );
                    } else {
  
                      $result = mysqli_query($conn,"SELECT * FROM users");
                      while($row = mysqli_fetch_array($result))
                      {
                      echo "<tr>";
                      echo "<td><div class='d-flex px-2 py-1'><div class='d-flex flex-column justify-content-center'> <h6 class='mb-0 text-sm'>". $row['Name'] . "</h6></div></div></td>";
                      echo "<td> <p class='text-xs font-weight-bold mb-0'>". $row['Student ID'] ."</p></td>";
                      echo "<td class='align-middle text-center text-sm'> <p class='text-xs font-weight-bold mb-0'>". $row['Email'] ."</p></td>";
                      echo "<td class='align-middle text-center text'> <p class='text-xs font-weight-bold mb-0'>". $row['Age'] ."</p></td>";
                      echo "</tr>";
                      }
  
                      mysqli_close($conn);
                    }
                  }
  
                  function runpostgreSQLFunction() {
                    // Connecting to postgresql database
                    $conn = pg_connect("host=localhost dbname=Project2_postgresql user=postgres password=awal1678");
                    // Check for database connection error
                    if( $conn ) {
  
                      $result = pg_query($conn,"SELECT * FROM users");
  
                      if (!$result) {
                        echo "An error occurred.\n";
                        exit;
                      }
  
                      while($row = pg_fetch_row($result))
                      {
                      echo "<tr>";
                      echo "<td><div class='d-flex px-2 py-1'><div class='d-flex flex-column justify-content-center'> <h6 class='mb-0 text-sm'>". $row[1] . "</h6></div></div></td>";
                      echo "<td> <p class='text-xs font-weight-bold mb-0'>". $row[0] ."</p></td>";
                      echo "<td class='align-middle text-center text-sm'> <p class='text-xs font-weight-bold mb-0'>". $row[3] ."</p></td>";
                      echo "<td class='align-middle text-center text'> <p class='text-xs font-weight-bold mb-0'>". $row[2] ."</p></td>";
                      echo "</tr>";
                      }
  
  
                    } else {
                    echo "Failed to connect to PostgreSQL:<br />";
                    }
                  }
  
                  function runmsSQLFunction() {
                    //Connect to sqlite3
                    $conn = new SQLite3('Project2_sqlite.sqlite');
                    if( $conn ) {
                      $results = $conn->query('SELECT * FROM users');
                      while ($row = $results->fetchArray()) {
                          //var_dump($row);
                          {
                            echo "<tr>";
                            echo "<td><div class='d-flex px-2 py-1'><div class='d-flex flex-column justify-content-center'> <h6 class='mb-0 text-sm'>". $row['Name'] . "</h6></div></div></td>";
                            echo "<td> <p class='text-xs font-weight-bold mb-0'>". $row['Student ID'] ."</p></td>";
                            echo "<td class='align-middle text-center text-sm'> <p class='text-xs font-weight-bold mb-0'>". $row['Email'] ."</p></td>";
                            echo "<td class='align-middle text-center text'> <p class='text-xs font-weight-bold mb-0'>". $row['Age'] ."</p></td>";
                            echo "</tr>";
                            }
                      }
                    } else {
                    echo "Failed to connect to SQLite:<br />";
                    }
  
                  }
  
                  function runoracleFunction() {
                    // Connecting to oracle database
                    $conn = oci_connect('AWAL', 'awal1678', 'localhost/XE');
                    if( $conn ) {
  
                      $result = oci_parse($conn,"SELECT * FROM AWAL.USERS");
                      oci_execute($result);
  
                      if (!$result) {
                        echo "An error occurred.\n";
                        exit;
                      }
  
                      while($row = oci_fetch_array($result, OCI_ASSOC+OCI_RETURN_NULLS))
                      {
                     
                      echo "<tr>";
                      echo "<td><div class='d-flex px-2 py-1'><div class='d-flex flex-column justify-content-center'> <h6 class='mb-0 text-sm'>". $row['NAME'] . "</h6></div></div></td>";
                      echo "<td> <p class='text-xs font-weight-bold mb-0'>". $row['STUDENT'] ."</p></td>";
                      echo "<td class='align-middle text-center text-sm'> <p class='text-xs font-weight-bold mb-0'>". $row['EMAIL'] ."</p></td>";
                      echo "<td class='align-middle text-center text'> <p class='text-xs font-weight-bold mb-0'>". $row['AGE'] ."</p></td>";
                      echo "</tr>";
                      }
  
                      oci_free_statement($result);
                      oci_close($conn);
  
                    } else {
                    echo "Failed to connect to Oracle:<br />";
                    }
                  }
  
                  if (array_key_exists('mysql', $_POST)) {
                    runMySQLFunction();
                  }
  
                  if (array_key_exists('postgreSQL', $_POST)) {
                     runpostgreSQLFunction();
                   }
  
                   if (array_key_exists('sqlite', $_POST)) {
                     runmsSQLFunction();
                   }
  
                   if (array_key_exists('oracle', $_POST)) {
                    runoracleFunction();
                  }
           
                
              ?>