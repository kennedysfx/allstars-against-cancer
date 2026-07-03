import dynamic from 'next/dynamic';
import styles from '../styles/terms.module.css';

const termsContent = `
<style>
    [data-custom-class='body'], [data-custom-class='body'] * { background: #ffffff !important; font-family: Arial, sans-serif !important; }
    [data-custom-class='title'], [data-custom-class='title'] * { font-size: 26px !important; color: #000000 !important; }
    [data-custom-class='subtitle'], [data-custom-class='subtitle'] * { color: #595959 !important; font-size: 14px !important; }
    [data-custom-class='heading_1'], [data-custom-class='heading_1'] * { font-size: 19px !important; color: #000000 !important; margin-top: 20px; }
    [data-custom-class='heading_2'], [data-custom-class='heading_2'] * { font-size: 17px !important; color: #000000 !important; margin-top: 15px; }
    [data-custom-class='body_text'], [data-custom-class='body_text'] * { color: #595959 !important; font-size: 14px !important; line-height: 1.6 !important; }
    [data-custom-class='link'], [data-custom-class='link'] * { color: #3030F1 !important; font-size: 14px !important; word-break: break-word !important; text-decoration: none !important; }
    [data-custom-class='link']:hover { text-decoration: underline !important; }
</style>

<div data-custom-class="body">
<div align="center" style="text-align: left;">
    <div class="MsoNormal" data-custom-class="title" style="line-height: 1.5;">
        <span><strong><h1>TERMS OF USE</h1></strong></span>
    </div>
    <div class="MsoNormal" data-custom-class="subtitle" style="line-height: 1.5;">
        <strong>Last updated</strong> <strong>July 03, 2026</strong>
    </div>
    <div class="MsoNormal" style="line-height: 1.1;"><br></div>
    <div style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>AGREEMENT TO OUR LEGAL TERMS</h2></span></strong></div>
</div>

<div align="center" style="text-align: left;">
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        We are <strong>AllStars Against Cancer Foundation</strong> ('<strong>Company</strong>', '<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'). We operate the website <span style="color: rgb(0, 58, 250);"><a target="_blank" data-custom-class="link" href="https://allstars-against-cancer.vercel.app/">https://allstars-against-cancer.vercel.app/</a></span> (the '<strong>Site</strong>'), as well as any other related products and services that refer or link to these legal terms (the '<strong>Legal Terms</strong>') (collectively, the '<strong>Services</strong>').
    </div>
    <div class="MsoNormal" style="line-height: 1;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        AllStars Against Cancer is a non-profit foundation website dedicated to raising awareness, supporting research, and facilitating charitable donations to combat cancer. The platform provides educational resources, shares patient stories, and allows users to make voluntary, non-refundable donations to support our mission.
    </div>
    <div class="MsoNormal" style="line-height: 1;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        You can contact us by email at <a target="_blank" data-custom-class="link" href="mailto:allstarsforcancercure@outlook.com">allstarsforcancercure@outlook.com</a>.
    </div>
    <div class="MsoNormal" style="line-height: 1;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('<strong>you</strong>'), and AllStars Against Cancer Foundation, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
    </div>
    <div class="MsoNormal" style="line-height: 1;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the 'Last updated' date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
    </div>
    <div class="MsoNormal" style="line-height: 1;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
    </div>
    <div class="MsoNormal" style="line-height: 1;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        We recommend that you print a copy of these Legal Terms for your records.
    </div>
</div>

<div align="center" style="line-height: 1.5;"><br></div>

<div align="center" style="text-align: left;">
    <div class="MsoNormal" data-custom-class="heading_1" style="line-height: 1.5;"><strong><h2>TABLE OF CONTENTS</h2></strong></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#services"><span style="color: rgb(0, 58, 250); font-size: 15px;">1. OUR SERVICES</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#ip"><span style="color: rgb(0, 58, 250); font-size: 15px;">2. INTELLECTUAL PROPERTY RIGHTS</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#userreps"><span style="color: rgb(0, 58, 250); font-size: 15px;">3. USER REPRESENTATIONS</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#prohibited"><span style="color: rgb(0, 58, 250); font-size: 15px;">4. PROHIBITED ACTIVITIES</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#ugc"><span style="color: rgb(0, 58, 250); font-size: 15px;">5. USER GENERATED CONTRIBUTIONS</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#license"><span style="color: rgb(0, 58, 250); font-size: 15px;">6. CONTRIBUTION LICENCE</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#sitemanage"><span style="color: rgb(0, 58, 250); font-size: 15px;">7. SERVICES MANAGEMENT</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#privacy"><span style="color: rgb(0, 58, 250); font-size: 15px;">8. PRIVACY POLICY</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#termination"><span style="color: rgb(0, 58, 250); font-size: 15px;">9. TERM AND TERMINATION</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#modifications"><span style="color: rgb(0, 58, 250); font-size: 15px;">10. MODIFICATIONS AND INTERRUPTIONS</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#law"><span style="color: rgb(0, 58, 250); font-size: 15px;">11. GOVERNING LAW</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#disputes"><span style="color: rgb(0, 58, 250); font-size: 15px;">12. DISPUTE RESOLUTION</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#corrections"><span style="color: rgb(0, 58, 250); font-size: 15px;">13. CORRECTIONS</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#disclaimer"><span style="color: rgb(0, 58, 250); font-size: 15px;">14. DISCLAIMER</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#liability"><span style="color: rgb(0, 58, 250); font-size: 15px;">15. LIMITATIONS OF LIABILITY</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#indemnification"><span style="color: rgb(0, 58, 250); font-size: 15px;">16. INDEMNIFICATION</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#userdata"><span style="color: rgb(0, 58, 250); font-size: 15px;">17. USER DATA</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#electronic"><span style="color: rgb(0, 58, 250); font-size: 15px;">18. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#california"><span style="color: rgb(0, 58, 250); font-size: 15px;">19. CALIFORNIA USERS AND RESIDENTS</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#misc"><span style="color: rgb(0, 58, 250); font-size: 15px;">20. MISCELLANEOUS</span></a></div>
    <div class="MsoNormal" style="line-height: 1.5;"><a data-custom-class="link" href="#contact"><span style="color: rgb(0, 58, 250); font-size: 15px;">21. CONTACT US</span></a></div>
</div>

<div align="center" style="text-align: left;">
    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="services" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>1. OUR SERVICES</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size: 15px;">The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</span>
    </div>
    <div class="MsoNormal" style="line-height: 1.5;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size: 15px;">The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).</span>
    </div>
    
    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="ip" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>2. INTELLECTUAL PROPERTY RIGHTS</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="heading_2" style="line-height: 1.5;"><strong><h3>Our intellectual property</h3></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:14px;">We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks').</span>
    </div>
    <div class="MsoNormal" style="line-height: 1.5;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:14px;">Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.</span>
    </div>
    <div class="MsoNormal" style="line-height: 1.5;"><br></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:14px;">The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use or internal business purposes only.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="userreps" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>3. USER REPRESENTATIONS</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not under the age of 18; (5) you will not access the Services through automated or non-human means; and (6) your use of the Services will not violate any applicable law or regulation.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="prohibited" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>4. PROHIBITED ACTIVITIES</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">You may not access or use the Services for any purpose other than that for which we make the Services available. Prohibited activities include, but are not limited to: bypassing or disrupting security feature systems, engaging in unauthorized framing or linking to the Services, tricking or misleading us and other users, or attempting to misappropriate donation routing paths.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="ugc" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>5. USER GENERATED CONTRIBUTIONS</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">The Services may invite you to chat, contribute to, or participate in blogs, message boards, and other functionality, and may provide you with the opportunity to create, submit, or distribute content and materials to us or on the Services (collectively, "Contributions"). Any Contributions you transmit may be treated as non-confidential and non-proprietary.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="license" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>6. CONTRIBUTION LICENCE</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, fully-paid, worldwide right, and licence to host, use, copy, reproduce, publish, and distribute such Contributions for any purpose, including public awareness campaigns.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="sitemanage" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>7. SERVICES MANAGEMENT</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms; and (3) otherwise manage the Services in a manner designed to protect our rights and property.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="privacy" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>8. PRIVACY POLICY</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">We care about data privacy and security. Please review our Privacy Policy. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted within the United States.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="termination" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>9. TERM AND TERMINATION</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES TO ANY PERSON FOR ANY REASON.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="modifications" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>10. MODIFICATIONS AND INTERRUPTIONS</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Services.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="law" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>11. GOVERNING LAW</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Washington and the United States, without regard to its conflict of law principles.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="disputes" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>12. DISPUTE RESOLUTION</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">Any legal action of whatever nature brought by either you or us shall be commenced or prosecuted in the state and federal courts located within Washington, United States, and the parties hereby consent to, and waive all defenses of lack of personal jurisdiction.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="corrections" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>13. CORRECTIONS</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="disclaimer" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>14. DISCLAIMER</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="liability" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>15. LIMITATIONS OF LIABILITY</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES arising from your use of the Services.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="indemnification" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>16. INDEMNIFICATION</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand made by any third party due to or arising out of your use of the Services.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="userdata" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>17. USER DATA</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services. You are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="electronic" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>18. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="california" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>19. CALIFORNIA USERS AND RESIDENTS</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="misc" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>20. MISCELLANEOUS</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision.</span>
    </div>

    <br>
    <div class="MsoNormal" data-custom-class="heading_1" id="contact" style="line-height: 1.5;"><strong><span style="font-size: 19px;"><h2>21. CONTACT US</h2></span></strong></div>
    <div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;">
        <span style="font-size:15px;">In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at: <strong>AllStars Against Cancer Foundation</strong>, Email: <strong>allstarsforcancercure@outlook.com</strong>.</span>
    </div>
</div>
</div>`;

function TermsAndConditionsView() {
  return (
    <div className={styles.pageWrapper}>
      {/* Hero Header Banner */}
      <section className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>TERMS OF USE</h1>
        <div className={styles.circleWrapper}>
          <div className={styles.circle + ' ' + styles.circle1}></div>
          <div className={styles.circle + ' ' + styles.circle2}></div>
          <div className={styles.circle + ' ' + styles.circle3}></div>
        </div>
      </section>

      {/* Main Content Layout Block */}
      <div className={styles.contentContainer}>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: termsContent }} 
        />
      </div>
    </div>
  );
}

// Disable SSR output dynamically to prevent hydration layout mismatch crashes
export default dynamic(() => Promise.resolve(TermsAndConditionsView), {
  ssr: false,
});