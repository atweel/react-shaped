import 'grunt';

export = (grunt: IGrunt): void => {
    grunt.loadNpmTasks('grunt-git');

    grunt.initConfig({
        gitmerge: {
            master: {
                options: {
                    branch: 'master',
                    message: 'Merge master branch',
                },
            },
        },
    });
}
