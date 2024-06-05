document.addEventListener('DOMContentLoaded', function() {
    var progressContainers = [
        document.getElementById('progress-container-1'),
        document.getElementById('progress-container-2'),
        document.getElementById('progress-container-3'),
        document.getElementById('progress-container-4')
    ];

    progressContainers.forEach(container => {
        var bar = new ProgressBar.SemiCircle(container, {
            strokeWidth: 6,
            color: '#9fb3c8',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: null,
            text: {
                value: '',
                alignToBottom: false
            },
            from: {color: '#9fb3c8'},
            to: {color: '#4c6488'},
            step: function(state, bar) {
                bar.path.setAttribute('stroke', state.color);
                var value = Math.round(bar.value() * 100);
                if (value === 0) {
                    bar.setText('');
                } else {
                    bar.setText(value);
                }
                bar.text.style.color = state.color;
            }
        });
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '2rem';
        bar.animate(Math.random());  // Animate to a random value for demonstration
    });
});
