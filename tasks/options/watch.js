module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

    // revelation
    // grunt is file centric rather than task???
    // make sure rules don't double match files
    lib: {
        files: ['libs/*.js'],
        tasks: ['jshint:precat', 'concat:base'],
    },
    src: {
        files: ['scripts/*.js'],
        tasks: ['jshint:precat', 'concat:base'],
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:base'],
    },
    html: {
        files: ['app/**/*.html'],
    },
    reloads: {
        options: {
            livereload: 7227,
        },
        files: ['app/**/*'],
        tasks: ['jshint:precat', 'sync:base'],
    },
    warn: {
        options: { reload: !false, },
        files: ['Gruntfile.js', 'tasks/**/*'],
        tasks: ['foobar'],
    },
};