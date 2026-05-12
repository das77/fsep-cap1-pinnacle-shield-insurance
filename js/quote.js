document.addEventListener('DOMContentLoaded', function () {
    const quoteForm = document.getElementById('quoteForm');

    const sections = {
        auto: {
            el: document.getElementById('auto-fields'),
            requiredIds: ['fullName', 'age', 'zipCode', 'vehicleYear', 'vehicleMake', 'vehicleModel', 'annualMileage', 'drivingRecord'],
        },
        home: {
            el: document.getElementById('home-fields'),
            requiredIds: ['homeFullName', 'homeAge', 'homeZipCode', 'homeValue', 'yearBuilt', 'squareFootage', 'constructionType'],
        },
        life: {
            el: document.getElementById('life-fields'),
            requiredIds: ['lifeFullName', 'lifeAge', 'lifeZipCode', 'lifeGender', 'lifeCoverageAmount', 'exerciseFrequency'],
        },
    };

    function showSection(type) {
        Object.entries(sections).forEach(([key, section]) => {
            const active = key === type;
            section.el.classList.toggle('hidden', !active);
            section.requiredIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.required = active;
            });
        });
    }

    // --- Error helpers ---

    function setError(id, message) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add('is-invalid');
        let fb = el.parentElement.querySelector('.invalid-feedback');
        if (!fb) {
            fb = document.createElement('div');
            fb.className = 'invalid-feedback';
            el.insertAdjacentElement('afterend', fb);
        }
        fb.textContent = message;
    }

    function clearError(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if (fb) fb.textContent = '';
    }

    function setRadioError(name, message) {
        const radio = document.querySelector(`input[name="${name}"]`);
        if (!radio) return;
        const container = radio.closest('.mb-3') || radio.closest('.mb-4');
        if (!container) return;
        let fb = container.querySelector('.radio-error');
        if (!fb) {
            fb = document.createElement('div');
            fb.className = 'radio-error text-danger small mt-2';
            container.appendChild(fb);
        }
        fb.textContent = message;
    }

    function clearRadioError(name) {
        const radio = document.querySelector(`input[name="${name}"]`);
        if (!radio) return;
        const container = radio.closest('.mb-3') || radio.closest('.mb-4');
        if (!container) return;
        const fb = container.querySelector('.radio-error');
        if (fb) fb.textContent = '';
    }

    function clearAllErrors() {
        if (!quoteForm) return;
        quoteForm.classList.remove('was-validated');
        quoteForm.querySelectorAll('input, select, textarea').forEach(el => {
            el.setCustomValidity('');
            el.classList.remove('is-invalid');
        });
        quoteForm.querySelectorAll('.invalid-feedback').forEach(el => { el.textContent = ''; });
        quoteForm.querySelectorAll('.radio-error').forEach(el => { el.textContent = ''; });
    }

    // --- Per-type validators ---

    const ZIP_RE = /^\d{5}$/;

    function validateAuto() {
        let valid = true;

        const name = document.getElementById('fullName').value.trim();
        if (name.length < 2) { setError('fullName', 'Full name must be at least 2 characters.'); valid = false; }
        else clearError('fullName');

        const age = Number(document.getElementById('age').value);
        if (!age || age < 16 || age > 100) { setError('age', 'Age must be between 16 and 100.'); valid = false; }
        else clearError('age');

        if (!ZIP_RE.test(document.getElementById('zipCode').value.trim())) {
            setError('zipCode', 'ZIP code must be exactly 5 digits.'); valid = false;
        } else clearError('zipCode');

        const year = Number(document.getElementById('vehicleYear').value);
        if (!year || year < 1990 || year > 2026) { setError('vehicleYear', 'Vehicle year must be between 1990 and 2026.'); valid = false; }
        else clearError('vehicleYear');

        if (!document.getElementById('vehicleMake').value) { setError('vehicleMake', 'Please select a vehicle make.'); valid = false; }
        else clearError('vehicleMake');

        if (!document.getElementById('vehicleModel').value.trim()) { setError('vehicleModel', 'Vehicle model is required.'); valid = false; }
        else clearError('vehicleModel');

        if (!document.getElementById('annualMileage').value) { setError('annualMileage', 'Please select an annual mileage range.'); valid = false; }
        else clearError('annualMileage');

        if (!document.getElementById('drivingRecord').value) { setError('drivingRecord', 'Please select your driving record.'); valid = false; }
        else clearError('drivingRecord');

        if (!document.querySelector('input[name="autoCoverageLevel"]:checked')) {
            setRadioError('autoCoverageLevel', 'Please select a coverage level.'); valid = false;
        } else clearRadioError('autoCoverageLevel');

        return valid;
    }

    function validateHome() {
        let valid = true;

        const name = document.getElementById('homeFullName').value.trim();
        if (name.length < 2) { setError('homeFullName', 'Full name must be at least 2 characters.'); valid = false; }
        else clearError('homeFullName');

        const age = Number(document.getElementById('homeAge').value);
        if (!age || age < 18 || age > 100) { setError('homeAge', 'Age must be between 18 and 100.'); valid = false; }
        else clearError('homeAge');

        if (!ZIP_RE.test(document.getElementById('homeZipCode').value.trim())) {
            setError('homeZipCode', 'ZIP code must be exactly 5 digits.'); valid = false;
        } else clearError('homeZipCode');

        const homeVal = Number(document.getElementById('homeValue').value);
        if (!homeVal || homeVal < 50000) { setError('homeValue', 'Home value must be at least $50,000.'); valid = false; }
        else clearError('homeValue');

        const yearBuilt = Number(document.getElementById('yearBuilt').value);
        if (!yearBuilt || yearBuilt < 1900 || yearBuilt > 2026) { setError('yearBuilt', 'Year built must be between 1900 and 2026.'); valid = false; }
        else clearError('yearBuilt');

        const squareFeet = Number(document.getElementById('squareFootage').value);
        if (!squareFeet || squareFeet < 500 || squareFeet > 10000) { setError('squareFootage', 'Square footage must be between 500 and 10,000.'); valid = false; }
        else clearError('squareFootage');

        if (!document.getElementById('constructionType').value) { setError('constructionType', 'Please select a construction type.'); valid = false; }
        else clearError('constructionType');

        if (!document.querySelector('input[name="homeCoverageLevel"]:checked')) {
            setRadioError('homeCoverageLevel', 'Please select a coverage level.'); valid = false;
        } else clearRadioError('homeCoverageLevel');

        return valid;
    }

    function validateLife() {
        let valid = true;

        const name = document.getElementById('lifeFullName').value.trim();
        if (name.length < 2) { setError('lifeFullName', 'Full name must be at least 2 characters.'); valid = false; }
        else clearError('lifeFullName');

        const age = Number(document.getElementById('lifeAge').value);
        if (!age || age < 18 || age > 85) { setError('lifeAge', 'Age must be between 18 and 85.'); valid = false; }
        else clearError('lifeAge');

        if (!ZIP_RE.test(document.getElementById('lifeZipCode').value.trim())) {
            setError('lifeZipCode', 'ZIP code must be exactly 5 digits.'); valid = false;
        } else clearError('lifeZipCode');

        if (!document.getElementById('lifeGender').value) { setError('lifeGender', 'Please select a gender.'); valid = false; }
        else clearError('lifeGender');

        if (!document.getElementById('lifeCoverageAmount').value) { setError('lifeCoverageAmount', 'Please select a coverage amount.'); valid = false; }
        else clearError('lifeCoverageAmount');

        if (!document.getElementById('exerciseFrequency').value) { setError('exerciseFrequency', 'Please select an exercise frequency.'); valid = false; }
        else clearError('exerciseFrequency');

        if (!document.querySelector('input[name="lifeSmoker"]:checked')) {
            setRadioError('lifeSmoker', 'Please indicate whether you smoke.'); valid = false;
        } else clearRadioError('lifeSmoker');

        if (!document.querySelector('input[name="lifeCoverageLevel"]:checked')) {
            setRadioError('lifeCoverageLevel', 'Please select a coverage level.'); valid = false;
        } else clearRadioError('lifeCoverageLevel');

        return valid;
    }

    function validateForm() {
        clearAllErrors();
        let valid = true;

        const insuranceType = document.querySelector('input[name="insuranceType"]:checked')?.value;
        if (!insuranceType) {
            setRadioError('insuranceType', 'Please select an insurance type.');
            valid = false;
        }

        const emailVal = document.getElementById('email').value.trim();
        if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            setError('email', 'Please enter a valid email address.');
            valid = false;
        }

        if (insuranceType === 'auto' && !validateAuto()) valid = false;
        if (insuranceType === 'home' && !validateHome()) valid = false;
        if (insuranceType === 'life' && !validateLife()) valid = false;

        return valid;
    }

    // --- Calculators ---

    function calculateAutoQuote(data) {
        const BASE = 75;
        const currentYear = new Date().getFullYear();

        const age = Number(data.age);
        const ageFactor = age < 25 ? 1.5 : age <= 65 ? 1.0 : 1.3;

        const vehicleAge = currentYear - Number(data.vehicleYear);
        const vehicleAgeFactor = vehicleAge < 3 ? 1.3 : vehicleAge <= 10 ? 1.0 : 0.8;

        const mileageFactors = {
            'under5000': 0.8, '5000-10000': 1.0,
            '10001-15000': 1.1, '15001-20000': 1.3, 'over20000': 1.5,
        };

        const recordFactors = {
            'clean': 1.0, '1ticket': 1.2, '2tickets': 1.5, 'accident': 1.8,
        };

        const coverageFactors = { 'basic': 0.8, 'standard': 1.0, 'premium': 1.4 };

        const monthly = BASE
            * ageFactor
            * vehicleAgeFactor
            * (mileageFactors[data.annualMileage] ?? 1.0)
            * (recordFactors[data.drivingRecord] ?? 1.0)
            * (coverageFactors[data.coverageLevel] ?? 1.0);

        return Math.round(monthly * 100) / 100;
    }

    function calculateHomeQuote(data) {
        const base = (Number(data.homeValue) * 0.003) / 12;

        const yearBuilt = Number(data.yearBuilt);
        const yearFactor = yearBuilt < 1970 ? 1.4 : yearBuilt <= 1999 ? 1.1 : 1.0;

        const constructionFactors = { 'wood': 1.2, 'brick': 1.0, 'concrete': 0.9, 'steel': 0.85 };

        const coverageFactors = { 'basic': 0.8, 'standard': 1.0, 'premium': 1.4 };

        const sizePremium = Number(data.squareFootage) * 0.01;

        let monthly = base
            * yearFactor
            * (constructionFactors[data.constructionType] ?? 1.0)
            * (data.securitySystem ? 0.95 : 1.0)
            * (data.fireSprinklers ? 0.92 : 1.0)
            * (coverageFactors[data.coverageLevel] ?? 1.0)
            + sizePremium;

        return Math.round(monthly * 100) / 100;
    }

    function calculateLifeQuote(data) {
        const base = (Number(data.coverageAmount) * 0.0005) / 12;

        const age = Number(data.age);
        const ageFactor = age <= 30 ? 1.0 : age <= 45 ? 1.5 : age <= 60 ? 2.5 : 4.0;

        const exerciseFactors = { 'rarely': 1.3, '1-2': 1.1, '3-4': 1.0, '5+': 0.9 };

        const genderFactors = { 'male': 1.1, 'female': 1.0, 'non-binary': 1.05 };

        const coverageFactors = { 'basic': 0.8, 'standard': 1.0, 'premium': 1.4 };

        const monthly = base
            * ageFactor
            * (data.smoker === 'yes' ? 2.0 : 1.0)
            * (exerciseFactors[data.exerciseFrequency] ?? 1.0)
            * (data.preexistingConditions ? 1.5 : 1.0)
            * (genderFactors[data.gender] ?? 1.0)
            * (coverageFactors[data.coverageLevel] ?? 1.0);

        return Math.round(monthly * 100) / 100;
    }

    function showResult(name, type, monthlyPremium) {
        document.getElementById('resultName').textContent = name;
        document.getElementById('resultType').textContent = type;
        document.getElementById('resultPrice').textContent =
            '$' + monthlyPremium.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mo';
        document.getElementById('quoteResult').classList.remove('d-none');
        document.getElementById('quoteResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // --- Event listeners ---

    document.querySelectorAll('input[name="insuranceType"]').forEach(radio => {
        radio.addEventListener('change', function () {
            showSection(this.value);
            clearAllErrors();
        });
    });

    if (quoteForm) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm()) return;

            const insuranceType = document.querySelector('input[name="insuranceType"]:checked')?.value;
            const email = document.getElementById('email').value;
            let data = { insuranceType, email };

            if (insuranceType === 'auto') {
                Object.assign(data, {
                    fullName: document.getElementById('fullName').value,
                    age: document.getElementById('age').value,
                    zipCode: document.getElementById('zipCode').value,
                    vehicleYear: document.getElementById('vehicleYear').value,
                    vehicleMake: document.getElementById('vehicleMake').value,
                    vehicleModel: document.getElementById('vehicleModel').value,
                    annualMileage: document.getElementById('annualMileage').value,
                    drivingRecord: document.getElementById('drivingRecord').value,
                    coverageLevel: document.querySelector('input[name="autoCoverageLevel"]:checked')?.value,
                });
                showResult(data.fullName, 'Auto Insurance', calculateAutoQuote(data));
            } else if (insuranceType === 'home') {
                Object.assign(data, {
                    fullName: document.getElementById('homeFullName').value,
                    age: document.getElementById('homeAge').value,
                    zipCode: document.getElementById('homeZipCode').value,
                    homeValue: document.getElementById('homeValue').value,
                    yearBuilt: document.getElementById('yearBuilt').value,
                    squareFootage: document.getElementById('squareFootage').value,
                    constructionType: document.getElementById('constructionType').value,
                    securitySystem: document.getElementById('securitySystem').checked,
                    fireSprinklers: document.getElementById('fireSprinklers').checked,
                    coverageLevel: document.querySelector('input[name="homeCoverageLevel"]:checked')?.value,
                });
                showResult(data.fullName, 'Home Insurance', calculateHomeQuote(data));
            } else if (insuranceType === 'life') {
                Object.assign(data, {
                    fullName: document.getElementById('lifeFullName').value,
                    age: document.getElementById('lifeAge').value,
                    zipCode: document.getElementById('lifeZipCode').value,
                    gender: document.getElementById('lifeGender').value,
                    smoker: document.querySelector('input[name="lifeSmoker"]:checked')?.value,
                    coverageAmount: document.getElementById('lifeCoverageAmount').value,
                    exerciseFrequency: document.getElementById('exerciseFrequency').value,
                    preexistingConditions: document.getElementById('preexistingConditions').checked,
                    coverageLevel: document.querySelector('input[name="lifeCoverageLevel"]:checked')?.value,
                });
                showResult(data.fullName, 'Life Insurance', calculateLifeQuote(data));
            }

            console.log('Quote Form Submitted:', data);
        });
    }
});
