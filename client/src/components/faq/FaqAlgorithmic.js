import { Box } from '@mui/material'
import React from 'react'

const FaqAlgorithmic = () => {
  return (
    <Box>
      <h3>Sample Challenge</h3>
<p><strong>Can I participate in a sample challenge?</strong></p>
<p>Yes, we recommend that you participate in our <a href="https://www.hackerearth.com/programming-practice-challenge/">sample challenge</a>.</p>
<p>This challenge enables you to understand how to participate in programming challenges on HackerEarth. It comprises detailed information about how programming questions should be attempted and details about the HackerEarth judge.</p>
<h3>Programming Challenge</h3>
<p><strong>1. Where will the challenge take place?</strong></p>
<p>This challenge is an online challenge.</p>
<p><strong>2. Will I receive a reminder notification before the challenge begins?</strong></p>
<p>You will receive a reminder e-mail 3 hours before the challenge begins only if you have registered for the challenge.</p>
<p><strong>3. How do I participate in this challenge?</strong></p>
<p>To participate in this challenge, do the following:</p>
<p>a. Register for the challenge</p>
<p>b. Visit the challenge page on start date/time</p>
<p>c. Click <strong>Participate in Challenge</strong></p>
<p><strong>4. Can we take up the challenges from mobile platforms?</strong></p>
<p>No. We don't support mobile platform for taking up the challenges. We only suggest our users to participate in the challenges from laptop/desktop.</p>
<p><strong>5. What type of questions will I have to solve in this challenge?</strong></p>
<p>The questions in this challenge are of the following types:</p>
<ul>
<li>
<p>Programming problems</p>
<ul>
<li>
<p>Write code in the online code editor that is provided with each problem and submit it.</p>
</li>
<li>
<p>You can make multiple submissions. The platform automatically considers the best submission.</p>
</li>
</ul>
</li>
<li>
<p>Multiple choice questions (MCQ)</p>
<ul>
<li>
<p>Questions with multiple choices will be provided.</p>
</li>
<li>
<p>You should select the correct answer from the list of choices.</p>
</li>
</ul>
</li>
<li>
<p>Subjective problems</p>
<ul>
<li>
<p>Instructions for each problem differ</p>
</li>
<li>
<p>Enter the solution in the text area that is provided and submit it</p>
</li>
</ul>
</li>
</ul>
<p><strong>6. Are the programming questions restricted to specific languages?</strong></p>
<p>The languages that you can write code in will be mentioned in the challenge details, if applicable.</p>
<p><strong>7. What will happen in case of there is an issue with my computer or Internet connection?</strong></p>
<p>If there is an issue with your computer or your Internet connection, you will not lose your previously submitted answers. They will be saved on HackerEarth's servers. You can log in again and continue coding from where you stopped.</p>
<p>However, the timer will continue running, which is why it is advised that you ensure that your computer/Internet connection is working properly before you begin the challenge.</p>
<p><strong>8. My code works in my local IDE, however, it throws compilation errors when I run it on the platform interface. Why does this happen?</strong></p>
<p>Every problem has the following two buttons:</p>
<p>a. Compile &amp; Run</p>
<ul>
<li>
<p>When you click Compile &amp; Run, the is tested against the sample input and output.</p>
</li>
<li>
<p>This ensures that you are able to test your code against predefined sample test cases before you submit your code.</p>
</li>
</ul>
<p>b. Submit</p>
<p>When you click Submit, the code is checked extensively against internal test cases. The following parameters are considered while checking the code:</p>
<ul>
<li>
<p>Time limit: The code should run within the stipulated time otherwise it will throw a Time Limit Exceeded (TLE) error.</p>
</li>
<li>
<p>Memory limit: The code should run within the give memory size otherwise it will throw a Memory Limit Exceeded (MLE) error.</p>
</li>
<li>
<p>Errors during runtime: Specific test cases check for Runtime Errors (RE) only.</p>
</li>
<li>
<p>Correct answer: If your answer is incorrect, then you will see the message Wrong Answer (WA) on the screen. This means that your program is not printing he correct answer. Ensure that your program conforms with the output format that is required.</p>
</li>
</ul>
<p><strong>9. Is it possible to change my submission after I have submitted a task?</strong></p>
<p>Yes, you can edit and submit the solution to a question (that you can view and edit) any number of times before the challenge-completion time window closes.</p>
<p><strong>Note</strong>: Some tests have timed sections. After the time limit is reached, you will not be able to revisit questions in that section.</p>
<p><strong>10. How does the online judge determine whether a solution is correct?</strong></p>
<p>An online judge is a code checker and not a human being. The code checker or "judge" tests your code automatically. Therefore, you must write your code accordingly.</p>
<p>For each problem, based on the specifications mentioned in the problem statement, there will be one or more input files and corresponding (correct) output files. The program that you create is run on each of the input files and the corresponding output must match the (correct) output files in order.</p>
<p>Your program will be marked incorrect in the following cases:</p>
<ul>
<li>
<p>Output files (generated by running your code) do not match the pre-generated output files</p>
</li>
<li>
<p>Output files (generated by running your code) matches all the pre-generated output files, however, it is not in the order in which the pre-generated output files are arranged</p>
</li>
</ul>
<p><strong>11. How does the time limit work?</strong></p>
<p>Your program must read, process, and output the result for all input files within the specified time limit.</p>
<p>The input file will be of the format that is specified in the problem. This means that if each input file contains multiple test cases, then your code must pass all the test cases within the specified time limit.</p>
<p><strong>12. How does the total execution time work?</strong></p>
<p>Your code is tested multiple times against different input files. The displayed execution time is the total time spent executing each input file. Hence, Total execution time &lt;= (Time Limit * Number of input files)</p>
<p>Your program is terminated in the following scenarios:</p>
<ul>
<li>
<p>If the time that is required to execute each input file exceeds the time limit execution that is set for any input file.</p>
</li>
<li>
<p>If the total time that is required to execute all the input files exceeds the total time limit allowed.</p>
</li>
</ul>
<p><strong>13. How does the total memory consumed work?</strong></p>
<p>The total memory consumed by a program is the sum of the memory that is consumed by the program in stack, data, heap, and BSS. To understand more about the address space of a program and the memory consumed, refer to <a href="http://qph.is.quoracdn.net/main-qimg-bb8eaf1c827026cbd85c8653999ea851">this image</a> or <a href="http://www.quora.com/Computer-Programming/What-is-the-simplest-and-most-accurate-way-to-measure-the-memory-used-by-a-program-in-a-programming-contest-environment/answer/Vivek-Prakash-2">this explanation</a>.</p>
<p><strong>14. My program doesn't compile. Why?</strong></p>
<ul>
<li>
<p>C/C++</p>
<ul>
<li>
<p>Ensure that you are using a compiler that complies with the standards.</p>
</li>
<li>
<p>For example, do not use Turbo C++. Code that compiles in Turbo C++ will often not compile on the online judge.</p>
</li>
<li>
<p>Also, remove 'conio.h includes' in your code.</p>
</li>
</ul>
</li>
<li>
<p>Java</p>
<ul>
<li>
<p>We support multiple classes and inner static classes.</p>
</li>
<li>
<p>Your code may throw errors if the inner classes are not static.</p>
</li>
<li>
<p>Please note that we will remove this constraint very soon. We will update you when this happens.</p>
</li>
</ul>
</li>
<li>
<p>Other languages</p>
<ul>
<li>
<p>The compilation errors that you see on the screen are self-explanatory.</p>
</li>
<li>
<p>However, if you require any more information, please contact us at <a href="mailto:support@hackerearth.com">support@hackerearth.com</a>.</p>
</li>
</ul>
</li>
</ul>
<p><strong>15. Does TLE error mean that my code is correct but slow?</strong></p>
<p>No, Time Limit Exceeded or TLE means that your solution has exceeded the amount of time that is allowed for problem execution or for a specific test case. Your solution never finished running in time and it was stopped in between. There is no definite way to know whether the code was correct.</p>
<p><strong>16. What does Wrong Answer (WA) mean?</strong></p>
<p>WA means that your program ran successfully but gave an incorrect answer. This could mean either of the following:</p>
<ul>
<li>
<p>Your program contains a bug</p>
</li>
<li>
<p>You have not interpreted the problem text correctly</p>
</li>
</ul>
<p>Apart from the sample input, your code will also be evaluated against multiple input and output cases. Therefore, even if your code passes the sample input correctly, it may not have passed one of the other input and output cases because of the answer is incorrect.</p>
<p><strong>17. What happens if I indulge in plagiarism?</strong></p>
<p>At HackerEarth, we take cheating/plagiarism very seriously. For more information about consequences of cheating, read our <a href="https://s3-ap-southeast-1.amazonaws.com/he-public-data/plagiarism_policy.pdf">plagiarism policy</a>.</p>
<p><strong>18. Why is my submission queued?</strong></p>
<p>Your submission is queued because of simultaneous submissions by multiple users. You will receive the result of your submission in real-time as soon as it is processed.</p>
<p><strong>19. My submissions are not evaluated. What should I do?</strong></p>
<p>There may be an issue with the online judge due to which your submissions are not being evaluated. Send an e-mail to <a href="mailto:support@hackerearth.com">support@hackerearth.com</a>.</p>
<p><strong>20. Will I receive the results of the challenge? If yes, when?</strong></p>
<p>You can view your ranking on the leaderboard for all challenges in which participation is not confidential. This leaderboard is updated in real-time.</p>
<p><strong>21. Where can I view the solutions for the problems of this challenge?</strong></p>
<p>Once the challenge is finished and the problem has been moved to a practice section, you can view the solutions (editorials) in the <strong>Practice</strong> section.</p>
<p><strong>22. Why am I seeing a runtime error on the screen?</strong></p>
<p>A runtime error means that the program was compiled successfully but it crashed or exited with an error. The most common error messages include the following:</p>

<p><strong>Avoiding runtime errors</strong></p>
<ul>
<li>
<p>Ensure that you are not using variables that haven't been initialized. These may be set to 0 on your computer, but aren't guaranteed to be on the judge.</p>
</li>
<li>
<p>Check every single occurrence of accessing an array element and see if it could possibly be out of bounds.</p>
</li>
<li>
<p>Ensure that you are not declaring too much memory. 64 MB is guaranteed, but having an array of size [100000][100000] will never work.</p>
</li>
<li>
<p>Ensure that you are not declaring too much stack memory. Any large arrays should be declared globally, outside of any functions - putting an array of 100000 ints inside a function probably will not work.</p>
</li>
</ul>
    </Box>
  )
}

export default FaqAlgorithmic