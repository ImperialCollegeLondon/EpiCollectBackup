module.exports = {
    css: {
        files: '**/*.less',
        tasks: ['less'],
        options: {
          livereload: true,
        }
    },
    livereload: {
        options: {
            livereload: 3579
        },
        files: [
            'app/index.html',
            '**/*.less',
            '**/*.css',
            'app/js/*.js'

        ]
    }
}
