document.addEventListener('DOMContentLoaded', function () {
    const sections = {
        auto: {
            el: document.getElementById('autoFields'),
            requiredIds: ['fullName', 'age', 'zipCode', 'vehicleYear', 'vehicleMake', 'vehicleModel', 'annualMileage', 'drivingRecord'],
        },
        home: {
            el: document.getElementById('homeFields'),
            requiredIds: ['homeFullName', 'homeAge', 'homeZipCode', 'homeValue', 'yearBuilt', 'squareFootage', 'constructionType'],
        },
        life: {
            el: document.getElementById('lifeFields'),
            requiredIds: ['lifeFullName', 'lifeAge', 'lifeZipCode', 'lifeGender', 'lifeCoverageAmount', 'exerciseFrequency'],
        },
    };

    function showSection(type) {
        Object.entries(sections).forEach(([key, section]) => {
            const active = key === type;
            section.el.classList.toggle('d-none', !active);
            section.requiredIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.required = active;
            });
        });
    }

    document.querySelectorAll('input[name="insuranceType"]').forEach(radio => {
        radio.addEventListener('change', function () {
            showSection(this.value);
        });
    });

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();

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
            }

            console.log('Quote Form Submitted:', data);

            quoteForm.reset();
            Object.values(sections).forEach(section => {
                section.el.classList.add('d-none');
                section.requiredIds.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.required = false;
                });
            });
        });
    }
});
