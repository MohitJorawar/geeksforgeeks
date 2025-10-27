(function(){
	const COURSE_PRICE = 19999;
	const BASE_DISCOUNT = 5000; // base discount so You Pay = 19999 - 5000 = 14999
	const VALID_COUPON = 'ACEGATE35';
	const COUPON_VALUE = 2450;
	const DEFAULT_ANY_COUPON = 2000; // apply when any text is entered (changed to ₹2000)

	// elements
	const elCourse = document.getElementById('coursePrice');
	const elDiscount = document.getElementById('discount');
	const elPremium = document.getElementById('premiumDiscount');
	const elCoupon = document.getElementById('couponDiscount');
	const elYouPay = document.getElementById('youPay');
	const elYouSave = document.getElementById('youSave');
	const couponInput = document.getElementById('couponInput');
	const applyBtn = document.getElementById('applyBtn');
	const couponStatus = document.getElementById('couponStatus');

	// initial render
	let couponApplied = false;
	let couponAmount = 0;

	function updateApplyBtnState(){
		// Turn green when there's input text OR when a coupon is already applied
		const hasText = (couponInput.value || '').trim() !== '';
		applyBtn.classList.toggle('active', hasText || couponApplied);
	}

	function render(){
		elCourse.textContent = COURSE_PRICE;
		elDiscount.textContent = BASE_DISCOUNT;
		elPremium.textContent = 0;
		elCoupon.textContent = couponAmount;
		const payable = COURSE_PRICE - BASE_DISCOUNT - couponAmount;
		elYouPay.textContent = payable >= 0 ? payable : 0;
		const saved = BASE_DISCOUNT + couponAmount;
		elYouSave.textContent = saved;
		updateApplyBtnState();
	}

	applyBtn.addEventListener('click', function(){
		const code = (couponInput.value || '').trim().toUpperCase();
		// If user has typed anything, apply a flat ₹1500 coupon
		if(!couponApplied && code !== ''){
			couponAmount = DEFAULT_ANY_COUPON;
			couponApplied = true;
			couponStatus.style.color = 'green';
			couponStatus.innerHTML = 'Coupon Applied !! - ₹' + couponAmount + ' <a href="#" id="removeLink">REMOVE</a>';
			// attach remove handler
			setTimeout(()=> {
				const removeLink = document.getElementById('removeLink');
				if(removeLink){
					removeLink.addEventListener('click', function(e){
						e.preventDefault();
						couponAmount = 0;
						couponApplied = false;
						couponStatus.textContent = '';
						couponInput.value = '';
						render();
					});
				}
			},0);
		} else if(!couponApplied && code === ''){
			// no input — show a short message
			couponStatus.style.color = 'red';
			couponStatus.textContent = 'Enter coupon code';
			setTimeout(()=> couponStatus.textContent = '', 1500);
		}
		render();
	});

	// Turn button green as user types
	couponInput.addEventListener('input', updateApplyBtnState);

	// allow pressing Enter on coupon input
	couponInput.addEventListener('keydown', function(e){
		if(e.key === 'Enter') applyBtn.click();
	});

	// pay button (demo)
	document.getElementById('payNow').addEventListener('click', function(){
		alert('Proceed to payment — amount: ₹' + document.getElementById('youPay').textContent);
	});

	// Dropdown behavior for Courses menu
	const coursesMenu = document.getElementById('coursesMenu');
	if(coursesMenu){
		const navBtn = coursesMenu.querySelector('.nav-btn');
		const dropdown = coursesMenu.querySelector('.dropdown');
		// open/close helpers that update ARIA and class
		function openCourses(){
			dropdown.setAttribute('aria-hidden','false');
			dropdown.classList.add('open');
			navBtn.setAttribute('aria-expanded','true');
		}
		function closeCourses(){
			dropdown.setAttribute('aria-hidden','true');
			dropdown.classList.remove('open');
			navBtn.setAttribute('aria-expanded','false');
		}
		// hover and keyboard focus support
		coursesMenu.addEventListener('mouseenter', openCourses);
		coursesMenu.addEventListener('mouseleave', closeCourses);
		coursesMenu.addEventListener('focusin', openCourses);
		coursesMenu.addEventListener('focusout', closeCourses);
	}

	// Dropdown behavior for Tutorials menu (added)
	const tutorialsMenu = document.getElementById('tutorialsMenu');
	if(tutorialsMenu){
		const tBtn = tutorialsMenu.querySelector('.nav-btn');
		const tDropdown = tutorialsMenu.querySelector('.dropdown');
		function openTutorials(){ tDropdown.setAttribute('aria-hidden','false'); tDropdown.classList.add('open'); tBtn.setAttribute('aria-expanded','true'); }
		function closeTutorials(){ tDropdown.setAttribute('aria-hidden','true'); tDropdown.classList.remove('open'); tBtn.setAttribute('aria-expanded','false'); }
		tutorialsMenu.addEventListener('mouseenter', openTutorials);
		tutorialsMenu.addEventListener('mouseleave', closeTutorials);
		tutorialsMenu.addEventListener('focusin', openTutorials);
		tutorialsMenu.addEventListener('focusout', closeTutorials);
	}

	// Dropdown behavior for Practice menu (added)
	const practiceMenu = document.getElementById('practiceMenu');
	if(practiceMenu){
		const pBtn = practiceMenu.querySelector('.nav-btn');
		const pDropdown = practiceMenu.querySelector('.dropdown');
		function openPractice(){ pDropdown.setAttribute('aria-hidden','false'); pDropdown.classList.add('open'); pBtn.setAttribute('aria-expanded','true'); }
		function closePractice(){ pDropdown.setAttribute('aria-hidden','true'); pDropdown.classList.remove('open'); pBtn.setAttribute('aria-expanded','false'); }
		practiceMenu.addEventListener('mouseenter', openPractice);
		practiceMenu.addEventListener('mouseleave', closePractice);
		practiceMenu.addEventListener('focusin', openPractice);
		practiceMenu.addEventListener('focusout', closePractice);
	}

	// Dropdown behavior for Jobs menu (added)
	const jobsMenu = document.getElementById('jobsMenu');
	if(jobsMenu){
		const jBtn = jobsMenu.querySelector('.nav-btn');
		const jDropdown = jobsMenu.querySelector('.dropdown');
		function openJobs(){ jDropdown.setAttribute('aria-hidden','false'); jDropdown.classList.add('open'); jBtn.setAttribute('aria-expanded','true'); }
		function closeJobs(){ jDropdown.setAttribute('aria-hidden','true'); jDropdown.classList.remove('open'); jBtn.setAttribute('aria-expanded','false'); }
		jobsMenu.addEventListener('mouseenter', openJobs);
		jobsMenu.addEventListener('mouseleave', closeJobs);
		jobsMenu.addEventListener('focusin', openJobs);
		jobsMenu.addEventListener('focusout', closeJobs);
	}

	// keep Esc closing all dropdowns for keyboard users
	document.addEventListener('keydown', function(e){
		if(e.key === 'Escape'){
			// close any open dropdowns by setting aria-hidden
			['coursesMenu','tutorialsMenu','practiceMenu','jobsMenu'].forEach(id=>{
				const el = document.getElementById(id);
				if(el){
					const btn = el.querySelector('.nav-btn');
					const dd = el.querySelector('.dropdown');
					if(dd){ dd.setAttribute('aria-hidden','true'); dd.classList.remove('open'); btn && btn.setAttribute('aria-expanded','false'); }
				}
			});
		}
	});

	render();
})();
