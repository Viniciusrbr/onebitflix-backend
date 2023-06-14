import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { User } from './User';
import { Favorite } from './Favorite';
import { Like } from './Like';

Category.hasMany(Course, { as: 'courses' })

Course.belongsTo(Category)
Course.belongsToMany(User, { through: Favorite })
Course.hasMany(Episode, { as: 'episodes' })
Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id' })
Course.belongsToMany(User, { through: Like })

Episode.belongsTo(Course)

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, { through: Favorite })
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id' })
User.belongsToMany(Course, { through: Like })

export {
    Course,
    Category,
    Episode,
    Favorite,
    Like,
    User
}