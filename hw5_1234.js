/* Homework 5.1: Find the author that made the most comments. */
db.posts.aggregate([
	{
		$unwind : "$comments"
	},
	{
		$project : {
			_id : 0,
			author : "$comments.author",
			comment : "$comments.body"
		}
	},
	{
		$group : {
			_id : "$author",
			comments : { $sum : 1 }
		}
	},
	{
		$sort : { comments : -1 }
	},
	{
		$limit : 1
	}
]);

/* Homework 5.2 */
db.zips.aggregate([
	{ $match : { $or : [ { state : "CA"}, { state : "NY" } ] } },
	{
		$group : {
			_id : { state : "$state", city : "$city" },
			population : { $sum : "$pop" }
		}
	},
	{ $match : { population : { $gt : 25000 } } },
	{
		$project : {
			group : { $literal : "group" },
			population : 1
		}
	},
	{
		$group : {
			_id : "$group",
			population : { $avg : "$population" },
		}
	}
]);

/* Homework 5.3 */
db.grades.aggregate([
	{ $unwind : "$scores" },
	{ $match : { $or : [ { "scores.type" : "exam" }, { "scores.type" : "homework" } ] } },
	{
		$group : {
			_id : { class_id : "$class_id", student_id : "$student_id" },
			students_avg : { $avg : "$scores.score" }
		}
	},
	{
		$group : {
			_id : "$_id.class_id",
			class_avg : { $avg : "$students_avg" }
		}
	},
	{ $sort : { class_avg : -1 } }
]);

/* Homework 5.4 */
db.zips.aggregate([
	{
		$project : {
			first_char: { $substr : [ "$city", 0, 1 ] },
			state : 1,
			city : 1,
			pop : 1
	    }
	},
	{
		$match : {
			first_char : { $in: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] }
		}
	},
	{
		$project : {
			state : 1,
			city : 1,
			pop : 1,
			undefined_city : { $literal : "undefined" }
		}
	},
	{
		$group : {
			_id : "$undefined_city",
			population : { $sum : "$pop" }
		}
	}
]);