// reviews.js - External reviews data and functionality

const reviews = [
    {
        name: "Yi Z.",
        rating: 5,
        text: "Nico arrived on time and quickly recognized the issues around our kitchen sink, disposal and pipes. He completed the job very efficiently even by including grabbing a new, matching disposal at a local store. Now our new disposal is working perfectly with no more issues. Thanks Nico!",
        date: "April 25, 2022"
    },
    {
        name: "Omar S.",
        rating: 5,
        text: "Will definitely hire again! He was able to change out my faucet very easily - he worked quickly and cleanly. Great to chat with as well!",
        date: "April 7, 2022"
    },
    {
        name: "Josh R.",
        rating: 5,
        text: "Great work! Showed up on time and fixed everything on my list quickly.",
        date: "March 9, 2022"
    },
    {
        name: "Alanna N.",
        rating: 5,
        text: "He was on time, professional and completed the job perfectly! Will definitely use Nico again",
        date: "March 7, 2022"
    },
    {
        name: "Jeremy A.",
        rating: 5,
        text: "",
        date: "December 6, 2021"
    },
    {
        name: "Elle Y.",
        rating: 5,
        text: "Great customer service and very efficient. Will definitely request Nico again to help me with other tasks. Thanks again!",
        date: "November 15, 2021"
    },
    {
        name: "Carlos C.",
        rating: 5,
        text: "Great tasker! Installed 4 new faucets in a very timely manner. Clean and efficient. Will definitely use again!",
        date: "November 12, 2021"
    },
    {
        name: "Shivram S.",
        rating: 5,
        text: "Nico did very well to identify the cause of my leaking faucet and get the right parts and did a professional job of installation. Highly recommended.",
        date: "October 31, 2021"
    },
    {
        name: "Jason D.",
        rating: 5,
        text: "Nico was outstanding. He got the job done and all the while kept me informed about how things were going, and he is a great person as well. Truly appreciate his help and his kind personality! I would not hesitate to hire Nico again!",
        date: "September 19, 2021"
    },
    {
        name: "Cathy C.",
        rating: 5,
        text: "Nico helped me fix the leaking under the dishwasher and he fixed the dishwasher too. He is on time and very friendly.",
        date: "September 19, 2021"
    },
    {
        name: "Rob H.",
        rating: 5,
        text: "Nico was prompt, thorough, helpful, and friendly. He was flexible when I had an unexpected schedule change too.",
        date: "November 7, 2022"
    },
    {
        name: "Daniel M.",
        rating: 5,
        text: "",
        date: "November 6, 2022"
    },
    {
        name: "Bethany G.",
        rating: 5,
        text: "Nico went above and beyond and did a fantastic job. Would 110% hire him again!",
        date: "November 4, 2022"
    },
    {
        name: "pamela m.",
        rating: 5,
        text: "Nico was outstandingly! He arrived right at the agreed time, was kind, friendly and able to repair my toilet issue in mins! He explained the issue at hand and with patience resolved the problem. Nico saved me money by not pushing any new or unnecessary parts. Will definitely choose Nico again!",
        date: "October 25, 2022"
    },
    {
        name: "Mara G.",
        rating: 5,
        text: "",
        date: "September 3, 2022"
    },
    {
        name: "Brecon R.",
        rating: 5,
        text: "Nico was efficient and knowledgeable. He was able to easily complete both projects we had for him.",
        date: "July 7, 2022"
    },
    {
        name: "Jake H.",
        rating: 4,
        text: "",
        date: "September 24, 2024"
    },
    {
        name: "Sara yasmeen K.",
        rating: 5,
        text: "Very professional and experienced.I highly recommend him. Thank you.",
        date: "September 11, 2024"
    },
    {
        name: "Karla J.",
        rating: 5,
        text: "",
        date: "May 25, 2024"
    },
    {
        name: "Amit G.",
        rating: 5,
        text: "",
        date: "June 22, 2023"
    },
    {
        name: "Mark C.",
        rating: 5,
        text: "",
        date: "January 25, 2023"
    },
    {
        name: "Diana L.",
        rating: 5,
        text: "Great to work with. Was very efficient and even went to buy a hose and came right back. Very pleased with the work and his approach.",
        date: "January 17, 2023"
    },
    {
        name: "Evelyn W.",
        rating: 5,
        text: "",
        date: "January 15, 2023"
    },
    {
        name: "Creon C.",
        rating: 5,
        text: "",
        date: "January 14, 2023"
    },
    {
        name: "Evelyn W.",
        rating: 5,
        text: "",
        date: "January 2, 2023"
    },
    {
        name: "Mark C.",
        rating: 5,
        text: "",
        date: "November 29, 2022"
    },
    {
        name: "Arthur R.",
        rating: 5,
        text: "",
        date: "June 10, 2022"
    },
    {
        name: "Bill B.",
        rating: 5,
        text: "",
        date: "June 3, 2022"
    },
    {
        name: "Eric I.",
        rating: 5,
        text: "",
        date: "May 4, 2022"
    },
    {
        name: "lydia r.",
        rating: 5,
        text: "",
        date: "April 30, 2022"
    },
    {
        name: "Daniel K.",
        rating: 5,
        text: "Efficient and professional.",
        date: "September 8, 2021"
    },
    {
        name: "Tristan T.",
        rating: 5,
        text: "",
        date: "July 6, 2021"
    },
    {
        name: "Brenda M.",
        rating: 5,
        text: "",
        date: "June 30, 2021"
    },
    {
        name: "Gloria I.",
        rating: 5,
        text: "",
        date: "June 14, 2021"
    },
    {
        name: "Marcus W.",
        rating: 5,
        text: "",
        date: "May 25, 2021"
    },
    {
        name: "Mark J.",
        rating: 5,
        text: "",
        date: "April 26, 2021"
    },
    {
        name: "Michelle R.",
        rating: 5,
        text: "Nico was great! He got the job done very quick, was super nice, and very communicative! Would definitely book again.",
        date: "April 19, 2021"
    },
    {
        name: "Lisa S.",
        rating: 5,
        text: "Nico was timely, professional, and was able to get the job done in a breeze. I would 100% recommend and hire him again for the future.",
        date: "April 15, 2021"
    },
    {
        name: "Rose M.",
        rating: 5,
        text: "",
        date: "March 15, 2021"
    },
    {
        name: "Siteng M.",
        rating: 5,
        text: "Installed faucet quickly and efficiently as well as cleaned up. Was courteous through the whole process.",
        date: "February 19, 2021"
    },
    {
        name: "Hannah R.",
        rating: 5,
        text: "Highly recommend! He can do everything. Garbage disposal, plumbing and all other handyman services. He went above and beyond and finished the tasks very quickly. I will definitely being using him for future projects. Thank you Nico!",
        date: "February 5, 2021"
    },
    {
        name: "Ken W.",
        rating: 5,
        text: "",
        date: "January 29, 2021"
    },
    {
        name: "Angelina L.",
        rating: 5,
        text: "He did a great job! Was very professional and quick with the task at hand.",
        date: "January 21, 2021"
    },
    {
        name: "Danielle D.",
        rating: 5,
        text: "",
        date: "February 1, 2023"
    },
    {
        name: "Laura J.",
        rating: 5,
        text: "Quick, polite, effective, friendly. 13/10",
        date: "June 19, 2022"
    },
    {
        name: "Sophie B.",
        rating: 5,
        text: "Did a wonderful job mounting a TV, shelves, and a mirror! Highly recommend!",
        date: "June 14, 2022"
    },
    {
        name: "Richard E.",
        rating: 5,
        text: "",
        date: "April 13, 2022"
    },
    {
        name: "Maxwell Z.",
        rating: 5,
        text: "Timely and professional. Great at mounting TV and curtain rods. Highly recommend",
        date: "April 8, 2022"
    },
    {
        name: "Rowena M.",
        rating: 5,
        text: "",
        date: "November 21, 2021"
    },
    {
        name: "Lorenzo M.",
        rating: 5,
        text: "He did a great job, on time and fast.",
        date: "November 14, 2021"
    },
    {
        name: "Jordan G.",
        rating: 5,
        text: "",
        date: "July 19, 2021"
    },
    {
        name: "Dasha B.",
        rating: 5,
        text: "",
        date: "July 16, 2021"
    },
    {
        name: "Corbin P.",
        rating: 5,
        text: "",
        date: "July 14, 2021"
    },
    {
        name: "Emily F.",
        rating: 5,
        text: "",
        date: "July 7, 2021"
    },
    {
        name: "Michael W.",
        rating: 5,
        text: "Did a wonderful and efficient job on mounting my tv and soundbar",
        date: "July 7, 2021"
    },
    {
        name: "Addison M.",
        rating: 5,
        text: "",
        date: "July 7, 2021"
    },
    {
        name: "Madison A.",
        rating: 5,
        text: "He was fantastic, quick, and very knowledgeable!",
        date: "July 2, 2021"
    },
    {
        name: "Michaela F.",
        rating: 5,
        text: "Nico was such a great help around the apartment! So kind, friendly, diligent, efficient precise and careful! Will be reaching out again! Thanks Nico!",
        date: "July 2, 2021"
    },
    {
        name: "Karen U.",
        rating: 5,
        text: "Nico took great care with hanging a couple of art pieces for me. He brought all of the necessary tools and did a terrific job!",
        date: "July 1, 2021"
    },
    {
        name: "Claudia D.",
        rating: 5,
        text: "",
        date: "June 30, 2021"
    },
    {
        name: "Jeff N.",
        rating: 5,
        text: "Amazing experience. On time and went above and beyond to do the job right. Thank you SO much!",
        date: "May 27, 2021"
    },
    {
        name: "Natalie V.",
        rating: 5,
        text: "Nico does amazing work! He hung floating shelves and cabinets in our laundry room that look amazing. He was professional and will absolutely be using him for our next project!",
        date: "May 24, 2021"
    },
    {
        name: "Nancy A.",
        rating: 5,
        text: "Nico was easy to work with, kind, and went above and beyond to help us. We are so grateful that we hired him and plan to use him again for future projects. We also plan to recommend him to friends!",
        date: "May 24, 2021"
    },
    {
        name: "Antoinette R.",
        rating: 5,
        text: "Very professional nice pleasant job well done highly recommended",
        date: "April 26, 2021"
    },
    {
        name: "Ayanna M.",
        rating: 5,
        text: "",
        date: "April 25, 2021"
    },
    {
        name: "Michael S.",
        rating: 5,
        text: "",
        date: "April 23, 2021"
    },
    {
        name: "Andrea M.",
        rating: 5,
        text: "Nico was great. Very professional and personable! I would hire him again and suggest him to friends! he came very prepared",
        date: "April 19, 2021"
    },
    {
        name: "Stequita H.",
        rating: 5,
        text: "",
        date: "April 15, 2021"
    },
    {
        name: "Rebecca F.",
        rating: 5,
        text: "",
        date: "April 13, 2021"
    },
    {
        name: "Thomas C.",
        rating: 5,
        text: "Nico had every tool and was very nice.",
        date: "April 9, 2021"
    },
    {
        name: "Sarah J.",
        rating: 5,
        text: "",
        date: "April 8, 2021"
    },
    {
        name: "Jasmine P.",
        rating: 5,
        text: "Nico was on time and did an outstanding Job!! Great Customer Service",
        date: "March 31, 2021"
    },
    {
        name: "Catherine G.",
        rating: 5,
        text: "Nico is absolutely the best! He was fast and efficient at mounting not only our TV but also a shelf that had to be mounted into concrete! He was incredibly friendly, knowledgeable of all the different materials that walls can be made of, and extremely precise with every little detail! We will definitely be reaching out to him again in the future! Thank you so much Nico!!",
        date: "March 28, 2021"
    },
    {
        name: "Mike K.",
        rating: 5,
        text: "",
        date: "March 11, 2021"
    },
    {
        name: "James K.",
        rating: 5,
        text: "Nico was punctual, polite, and efficient. I will definitely work with him again.",
        date: "March 3, 2021"
    },
    {
        name: "William C.",
        rating: 5,
        text: "Great working with this individual!",
        date: "March 3, 2021"
    },
    {
        name: "Danielle M.",
        rating: 5,
        text: "Awesome! He can do everything.",
        date: "February 12, 2021"
    },
    {
        name: "Rachel B.",
        rating: 5,
        text: "Nico did a fantastic job mounting our items and helping repair a small issue with our floor.",
        date: "February 7, 2021"
    },
    {
        name: "Saloni J.",
        rating: 5,
        text: "",
        date: "February 5, 2021"
    },
    {
        name: "Justin V.",
        rating: 5,
        text: "",
        date: "February 4, 2021"
    },
    {
        name: "Britany D.",
        rating: 5,
        text: "",
        date: "January 29, 2021"
    },
    {
        name: "Van E.",
        rating: 5,
        text: "Nico was awesome to work with! Would definitely recommend",
        date: "April 8, 2021"
    },
    {
        name: "Michelle C.",
        rating: 5,
        text: "This was first time using this app and I really enjoyed it! Nico was very efficient and thoughtful with the jobs I needed.",
        date: "April 1, 2021"
    },
    {
        name: "Steven M.",
        rating: 5,
        text: "Nico was fast and efficient. He provided superior service and was very knowledgeable in the mounting task. Would definitely recommend.",
        date: "January 27, 2021"
    },
    {
        name: "Syed K.",
        rating: 5,
        text: "Highly professional, punctual and has all the toolkit to do a great job. Got my tv wall mount completed with perfection. Thank you!",
        date: "January 27, 2021"
    },
    {
        name: "Delanna B.",
        rating: 5,
        text: "Very friendly, and exactly what I hoped for. Got the task done quickly, and helped problem solve when the equipment I bought didn't work as well as planned. Thank you!",
        date: "January 23, 2021"
    },
    {
        name: "Ana P.",
        rating: 5,
        text: "Excellent.",
        date: "January 20, 2021"
    },
    {
        name: "Justin G.",
        rating: 5,
        text: "Nico did a great job mounting not one, but two TVs with great precision and timing. It was great working with him, and a great person to have around. Hire him!!",
        date: "January 19, 2021"
    },
    {
        name: "Connor J.",
        rating: 5,
        text: "Nico was professional, on time, and performed quality work for my apartment. I loved how speedy he was and he went out of his way to clean up his mess. I would highly recommend him for all your maintenance and handy person needs!",
        date: "January 18, 2021"
    },
    {
        name: "Jessica M.",
        rating: 5,
        text: "Nico was amazing! He was so friendly and knowledgeable, easy to work with communicate with, and did an amazing job measuring and hanging floating shelves and pictures in my new home. He was kind to offer his opinion of placement of things and made it fun and easy. I will definitely be hiring him again for other tasks. He is a wealth of knowledge! Hire him!",
        date: "January 16, 2021"
    },
    {
        name: "Sujay J.",
        rating: 5,
        text: "",
        date: "June 20, 2023"
    },
    {
        name: "Kimberly K.",
        rating: 5,
        text: "Very efficient and a quick thinker ! Fixed my cabinet in 10 mins !",
        date: "June 6, 2023"
    },
    {
        name: "Lawrence J.",
        rating: 5,
        text: "Nico is efficient, flexible and friendly. Did a great job. Will definitely use him again.",
        date: "April 23, 2023"
    },
    {
        name: "Courtney N.",
        rating: 5,
        text: "Nico is awesome! Quickly finished several projects around my condo. He's very personable and fun to have around as well. Am a repeat customer and will continue calling him when I need something done right.",
        date: "November 2, 2022"
    },
    {
        name: "Jennifer J.",
        rating: 5,
        text: "",
        date: "May 12, 2022"
    },
    {
        name: "Allison S.",
        rating: 5,
        text: "Nico is the best of the best! Incredibly knowledgeable in a variety of areas, punctual and friendly. I've worked with Nico on a variety of projects throughout my house, including electrical, dryer duct cleaning, garage door repair and furnace repair and he always does the job top notch.",
        date: "April 25, 2022"
    },
    {
        name: "Austin T.",
        rating: 5,
        text: "",
        date: "February 23, 2022"
    },
    {
        name: "Jessica C.",
        rating: 5,
        text: "He was fantastic in and out in a timely manor, wore his mask, and kept very organized throughout. Will be using him again!",
        date: "September 21, 2021"
    },
    {
        name: "Courtney N.",
        rating: 5,
        text: "",
        date: "July 14, 2021"
    },
    {
        name: "Sarah B.",
        rating: 5,
        text: "Quick, friendly, helpful. Would use again for sure.",
        date: "July 13, 2021"
    },
    {
        name: "Evelyn W.",
        rating: 5,
        text: "Nico was very professional and had all the tools he needed to complete the job. I'm very happy with his service and highly recommend him.",
        date: "July 13, 2021"
    },
    {
        name: "Sunil B.",
        rating: 5,
        text: "Nico is very professional and a hard working individual .. would definitely love to hire him again!",
        date: "April 29, 2021"
    },
    {
        name: "Sarry Y.",
        rating: 5,
        text: "Amazing tasker! Absolutely would hire again! Super clean and efficient and very kind. Thanks for helping out!",
        date: "April 20, 2021"
    },
    {
        name: "Ruchia A.",
        rating: 4,
        text: "",
        date: "April 19, 2021"
    },
    {
        name: "Nikki G.",
        rating: 5,
        text: "",
        date: "April 13, 2021"
    },
    {
        name: "Nikki G.",
        rating: 5,
        text: "Nico was punctual, friendly and efficient. Will definitely hire again. Thanks!",
        date: "April 13, 2021"
    },
    {
        name: "Stomi M.",
        rating: 5,
        text: "",
        date: "April 13, 2021"
    },
    {
        name: "Sharad K.",
        rating: 5,
        text: "",
        date: "April 7, 2021"
    },
    {
        name: "Kurt M.",
        rating: 5,
        text: "Nico was very efficient and did great work. He also explained other things he could fix for me. He was very professional and I would absolutely hire him again",
        date: "April 3, 2021"
    },
    {
        name: "Allison S.",
        rating: 5,
        text: "We had a great experience working with Nico! He was punctual, professional and very thorough. We will definitely be working with him again.",
        date: "April 1, 2021"
    },
    {
        name: "Taryn I.",
        rating: 5,
        text: "Nico did a fantastic job. He fixed my closet doors that were very crooked and off the tracks. He very professional, nice and I would highly recommend him.",
        date: "February 1, 2021"
    },
    {
        name: "Sara G.",
        rating: 5,
        text: "Nico was punctual and professional. He listened to what I needed and completed my task efficiently. Would absolutely recommend this tasker to others- highly capable and reliable.",
        date: "January 20, 2021"
    }
];

// Generate stars display
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    return stars;
}

// Create HTML for each review card
function createReviewCard(review) {
    const reviewText = review.text ? `"${review.text}"` : '';
    return `
        <div class="review-card">
            <div class="review-header">
                <div>
                    <div class="reviewer-name">${review.name}</div>
                    <div class="review-stars">${generateStars(review.rating)}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="verified-badge">✓ Verified</div>
            </div>
            <div class="review-text">${reviewText}</div>
        </div>
    `;
}

// Initialize reviews when page loads
function initializeReviews() {
    // Update review count
    const reviewCountElement = document.getElementById('reviewCount');
    if (reviewCountElement) {
        reviewCountElement.textContent = reviews.length;
    }

    // Generate all reviews HTML
    const reviewsHTML = reviews.map(createReviewCard).join('');
    const scrollContainer = document.getElementById('reviewsScroll');
    
    if (scrollContainer) {
        // Duplicate reviews for seamless infinite scroll
        scrollContainer.innerHTML = reviewsHTML + reviewsHTML;
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeReviews);
} else {
    initializeReviews();
}