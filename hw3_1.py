import pymongo
import sys

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")

def remove_lowest_homework_all():
	print "removing lowest homework score for each student"
	db = connection.school
	updated_count = 0

	try:
		
		students = db.students.find().sort( [( "_id", 1 )] )
		
		for student in students:

			homework_scores = sorted([score for score in student.get("scores") if score["type"] == "homework"])
			student.get("scores").remove(homework_scores[0])

			result = db.students.replace_one({"_id" : student["_id"]}, student)
			updated_count += result.modified_count

		print updated_count

	except Exception as e:
		raise

remove_lowest_homework_all()