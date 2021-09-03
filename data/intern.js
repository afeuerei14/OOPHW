const Team = require ('./team')
import Team from './team.js';
class Intern extends Team {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }
    // getRole() = Intern;
    getRole() {
        return "Intern";
    }
}
module.exports = Intern;
