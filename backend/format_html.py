# simple python script to convert html to tailwind css so that it can be used in the frontend

message = """<main><section class="utils_articlePage__sM9Xw"><h1>SUCSS AGM 2023</h1>
<p><strong>Date</strong>: 2023-04-26</p>
<p><strong>Difficulty</strong>: n/a</p>
<p><strong>Delivered By</strong>: All</p>
<h2>Overview</h2>
<p><strong>You can nominate yourself now at <a href="https://nominate.sucss.org/">https://nominate.sucss.org/</a>!</strong> The deadline for nominations is 5pm on April 26th, 2023.</p>
<p>This is your chance to run for a position on the 2023-2024 committee! All roles except Member without Portfolio are up for election: a brief description for each role can be found below.</p>
<p>The AGM will be taking place on the 26th April. Candidates will have the opportunity to present their manifestos, with members being able to ask any questions after their presentations.</p>
<p>Voting will open for 10 minutes after the presentations have taken place, during which we'll give out the usual free pizza! Finally, we're going to head down to The Hobbit afterwards to celebrate the new committee being appointed.</p>
<h2>Roles</h2>
<ul>
<li><strong>President</strong>: The president is the figurehead of the society, responsible for delegating tasks between the other committee members, ensuring the society is running smoothly, and managing relations with the wider University and Students' Union.</li>
<li><strong>Vice-President</strong>: The vice-president assists the president with running and managing the society, as well as being the main point of contact for industry relations.</li>
<li><strong>Secretary</strong>: The secretary is responsible for the administration of the society. Specifically, this includes arranging meetings, taking minutes and organising the society's documents (aside from financial documents which are the responsibility of the treasurer).</li>
<li><strong>Treasurer</strong>: The treasurer handles the financing of the group, including applying for grants, sourcing income, signing off expenditure claims and budgeting.</li>
<li><strong>Webmaster</strong>: The webmaster is primarily responsible for maintaining and developing the SUCSS website, but may also assist the technical officer with any other technical matters.</li>
<li><strong>Technical Officer</strong>: The technical officer is resposible for any technical aspects of the society, including managing the VM, developing technical infrastructure for sessions where needed, and coordinating with the webmaster when needed.</li>
<li><strong>Events Officer</strong>: The events officer is responsible for arranging both drinking and non-drinking events. They should come up with ideas for socials, promote the social events, and book venues where needed.</li>
</ul>
<p>All members are responsible for creating weekly sessions, however the Technical Officer is expected to assist in creating any infrastructure needed to host said sessions. Responsibility for the welfare of members falls equally on all committee members.</p>
<h2>Results</h2>
<p>Be aware that of the original 36 votes, <strong>18</strong> were cast outside of the 10 minute voting period (20:00 - 20:10) and have therefore been discounted. One vote was from the chair and, as per the constitution, is only relevant in the event of a tie, of which there were none. Therefore, the total number of valid votes is <strong>17</strong>.</p>
<p><strong>Constitution change vote</strong></p>
<ul>
<li>Accept (17 votes)</li>
<li>Reject (0 votes)
<em>The proposed change to replace all gendered pronouns such as "his/her" with their gender neutral equivalents such as "their" has been accepted and the constitution will be updated with this change.</em></li>
</ul>
<p><strong>President</strong></p>
<ul>
<li>Elected: Skyler Mansfield (17 votes)</li>
<li>RON (0 votes)</li>
</ul>
<p><strong>Vice President</strong></p>
<ul>
<li>Elected: Matthew Grove and Sam Kitson (17 votes) [ran as a single entity]</li>
<li>RON (0 votes)</li>
</ul>
<p><strong>Secretary</strong></p>
<ul>
<li>RON (17 votes)</li>
</ul>
<p><em>There were no nominations for this role at this AGM.</em></p>
<p><strong>Treasurer</strong></p>
<ul>
<li>Elected: William Pearman (16 votes)</li>
<li>RON (1 votes)</li>
</ul>
<p><strong>Webmaster</strong></p>
<ul>
<li>Elected: Rishabh Arora (17 votes)</li>
<li>Akash Aravindan (0 votes)</li>
<li>RON (0 votes)</li>
</ul>
<p><strong>Technical Officer</strong></p>
<ul>
<li>Elected: Albert Ratuszniak (9 votes)</li>
<li>Rishabh Arora (3 votes)</li>
<li>RON (5 votes)</li>
</ul>
<p><strong>Events Officer</strong></p>
<ul>
<li>Elected: Nathan Smith (17 votes)</li>
<li>Akash Aravindan (0 votes)</li>
<li>RON (0 votes)</li>
</ul>
</section></main>"""

def change_to_tailwind(message):
    message = message.replace('<main>', '<main class="container mx-auto px-4">')
    message = message.replace('<h1>', '<h1 class="text-4xl font-bold">')
    message = message.replace('<h2>', '<h2 class="text-3xl font-bold my-5">')
    message = message.replace('</h2>', '</h2><hr class="my-4">')
    message = message.replace('<p>', '<p class="my-2">')
    message = message.replace('<strong>', '<strong class="font-bold">')
    message = message.replace('<code>', '<code class="bg-gray-800 p-1 rounded">')
    message = message.replace('<a', '<a class="hover:underline"')
    return message

print(change_to_tailwind(message))